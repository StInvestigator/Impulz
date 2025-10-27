package com.example.server.service.playlist;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.data.repository.PlaylistTrackRepository;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.key.PlaylistTrackKey;
import com.example.server.service.image.ImageService;
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

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final PlaylistTrackRepository playlistTrackRepository;
    private final TrackService trackService;
    private final UserService userService;
    private final ImageService imageService;

    public PlaylistDto getPlaylistDtoById(Long id) {
        return PlaylistDto.fromEntity(playlistRepository.findById(id).orElseThrow());
    }

    public PlaylistSimpleDto getPlaylistSimpleDtoById(Long id) {
        return PlaylistSimpleDto.fromEntity(playlistRepository.findById(id).orElseThrow());
    }

    public void createPlaylist(Playlist playlist) {
        playlistRepository.save(playlist);
    }

    @CacheEvict(cacheNames = {"playlist.findTopPlaylistsByFavorites", "playlist.findRecentPublicPlaylistsByGenre"}, allEntries = true)
    public void deletePlaylistById(Long id) {
        playlistRepository.deleteById(id);
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
        return entity;
    }


    @Override
    public Page<PlaylistSimpleDto> getPlaylistsFavorite(String ownerId, Pageable pageable) {
        return playlistRepository.findAllByFavoredByUserId(ownerId,pageable).map(PlaylistSimpleDto::fromEntity);
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
}
