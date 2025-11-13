package com.example.server.service.playlist;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.data.repository.PlaylistTrackRepository;
import com.example.server.data.repository.UserFavoritePlaylistRepository;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.id.UserFavoriteAlbum;
import com.example.server.model.id.UserFavoritePlaylist;
import com.example.server.model.key.PlaylistTrackKey;
import com.example.server.model.key.UserFavoriteAlbumKey;
import com.example.server.model.key.UserFavoritePlaylistKey;
import com.example.server.service.elasticsearch.document.DataSyncService;
import com.example.server.service.image.ImageService;
import com.example.server.service.keycloak.KeycloakService;
import com.example.server.service.s3.S3StorageService;
import com.example.server.service.track.TrackService;
import com.example.server.service.user.UserService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final PlaylistTrackRepository playlistTrackRepository;
    private final UserFavoritePlaylistRepository userFavoritePlaylistRepository;
    private final TrackService trackService;
    private final UserService userService;
    private final ImageService imageService;
    private final DataSyncService dataSyncService;
    private final KeycloakService keycloakService;

    public PlaylistDto getPlaylistDtoById(Long id) {
        return PlaylistDto.fromEntity(playlistRepository.findById(id).orElseThrow());
    }

    public PlaylistSimpleDto getPlaylistSimpleDtoById(Long id) {
        return PlaylistSimpleDto.fromEntity(playlistRepository.findById(id).orElseThrow());
    }

    public void createPlaylist(Playlist playlist) {
        playlistRepository.save(playlist);
        dataSyncService.syncPlaylist(playlist);
    }

    @CacheEvict(cacheNames = {"playlist.findTopPlaylistsByFavorites", "playlist.findRecentPublicPlaylistsByGenre"}, allEntries = true)
    @Transactional
    public void deletePlaylistById(Long id) {
        Playlist playlist = playlistRepository.findById(id).orElseThrow();
        if(!Objects.equals(playlist.getOwner().getId(), keycloakService.getUserId())){
            throw new SecurityException("Trying to delete different user`s playlist");
        }
        imageService.deleteImage(playlist.getImageUrl());
        playlistRepository.delete(playlist);
        dataSyncService.deletePlaylist(id);
    }

    @Cacheable(value = "playlist.findTopPlaylistsByFavorites",
            key = "'p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    public PageDto<PlaylistSimpleDto> findTopPlaylistsByFavorites(Pageable pageable) {
        return new PageDto<>(playlistRepository.
                findTopPlaylistsByFavorites(pageable).
                map(PlaylistSimpleDto::fromEntity));
    }

    @Transactional
    public void addTrackToPlaylist(Long playlistId, Long trackId) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));
        Track track = trackService.getTrackById(trackId);

        if (track == null) {
            throw new EntityNotFoundException("Track not found");
        }

        boolean trackAlreadyExists = playlistTrackRepository.existsById_PlaylistIdAndId_TrackId(playlistId, trackId);

        if (trackAlreadyExists) {
            throw new IllegalArgumentException("Track already exists in playlist");
        }

        PlaylistTrackKey key = new PlaylistTrackKey(playlistId, trackId);
        PlaylistTrack entry = new PlaylistTrack();
        entry.setId(key);
        entry.setPlaylist(playlist);
        entry.setTrack(track);
        entry.setPosition(1);
        playlistRepository.correctTracksPositionsAfterChangingPosition(playlistId, 1, playlist.getTracks().size() + 1);
        playlistTrackRepository.save(entry);
    }

    @Transactional
    public void addTrackToPlaylist(String title, String userId, Long trackId) {
        addTrackToPlaylist(playlistRepository.findPlaylistIdByTitleAndOwnerId(title, userId), trackId);
    }

    @Override
    @Transactional
    public void changeTrackPosition(Long playlistId, Long trackId, Integer position) {
        var pt = playlistTrackRepository.findById(new PlaylistTrackKey(playlistId, trackId)).get();
        playlistRepository.correctTracksPositionsAfterChangingPosition(playlistId, position, pt.getPosition());

        pt.setPosition(position);

        playlistTrackRepository.save(pt);
    }

    @Override
    @Transactional
    public void removeTrackFromPlaylist(Long playlistId, Long trackId) {
        var pt = playlistTrackRepository.findById(new PlaylistTrackKey(playlistId, trackId)).get();
        playlistRepository.correctTracksPositionsAfterRemovingTrack(playlistId, pt.getPosition());
        playlistTrackRepository.delete(pt);
    }

    @Override
    public Playlist create(String title, String uid, Boolean isPublic, MultipartFile img) {
        Playlist entity = new Playlist();
        entity.setImageUrl(img != null ? imageService.uploadImage(img, title) : null);
        entity.setTitle(title);
        entity.setCreatedAt(OffsetDateTime.now());
        entity.setOwner(userService.getUserById(uid));
        entity.setIsPublic(isPublic);
        playlistRepository.save(entity);
        dataSyncService.syncPlaylist(entity);
        return entity;
    }

    @Override
    public Playlist update(Long id, String title, Boolean isPublic, MultipartFile img) {
        Playlist existing = playlistRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found with id: " + id));

        if(!Objects.equals(existing.getOwner().getId(), keycloakService.getUserId())){
            throw new SecurityException("Trying to update different user`s playlist");
        }

        if (title != null && !title.isBlank()) {
            existing.setTitle(title);
        }
        existing.setIsPublic(isPublic);

        if (img != null) {
            imageService.deleteImage(existing.getImageUrl());
            existing.setImageUrl(imageService.uploadImage(img, title));
        }

        dataSyncService.syncPlaylist(existing);
        return playlistRepository.save(existing);
    }


    @Override
    public Page<PlaylistSimpleDto> getPlaylistsFavorite(String ownerId, Pageable pageable) {
        return playlistRepository.findAllByFavoredByUserId(ownerId, pageable).map(PlaylistSimpleDto::fromEntity);
    }

    @Override
    public List<PlaylistSimpleDto> getAllPlaylistsByOwnerId(String ownerId) {
        return playlistRepository.findAllByOwnerIdOrderByCreatedAtDesc(ownerId).stream().map(PlaylistSimpleDto::fromEntity).toList();
    }

    @Override
    public Page<PlaylistSimpleDto> getPublicPlaylistsByOwnerId(String ownerId, Pageable pageable) {
        return playlistRepository.findAllByOwnerIdAndIsPublicTrue(ownerId, pageable).map(PlaylistSimpleDto::fromEntity);
    }

    @Override
    public Page<PlaylistDto> getAllPlaylistsDtoByOwnerId(String ownerId, Pageable pageable) {
        return playlistRepository.findAllByOwnerId(ownerId, pageable)
                .map(PlaylistDto::fromEntity);
    }

    @Override
    @Cacheable(value = "playlist.findRecentPublicPlaylistsByGenre",
            key = "#genreId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    public PageDto<PlaylistSimpleDto> findRecentPublicPlaylistsByGenre(Long genreId, Pageable pageable) {
        return new PageDto<>(playlistRepository
                .findRecentPublicPlaylistsByGenre(genreId, pageable)
                .map(PlaylistSimpleDto::fromEntity));
    }

    @Override
    public List<Playlist> findPlaylistsByIds(List<Long> ids) {
        return playlistRepository.findAllById(ids);
    }

    @Override
    public void like(Long playlistId, String userId) {
        UserFavoritePlaylist entity = new UserFavoritePlaylist();
        entity.setId(new UserFavoritePlaylistKey(userId, playlistId));
        entity.setUser(userService.getUserById(userId));
        entity.setPlaylist(playlistRepository.findById(playlistId).orElseThrow());
        entity.setAddedAt(OffsetDateTime.now());
        userFavoritePlaylistRepository.save(entity);
    }
}
