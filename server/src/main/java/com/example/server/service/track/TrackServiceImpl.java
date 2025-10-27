package com.example.server.service.track;

import com.example.server.data.repository.*;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Track.*;
import com.example.server.model.*;
import com.example.server.model.id.UserFavoriteTrack;
import com.example.server.model.key.UserFavoriteTrackKey;
import com.example.server.service.author.AuthorService;
import com.example.server.service.genre.GenreService;
import com.example.server.service.image.ImageService;
import com.example.server.service.music.MusicService;
import com.example.server.service.user.UserServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.time.OffsetDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
public class TrackServiceImpl implements TrackService {
    private final TrackRepository trackRepository;
    private final AuthorService authorService;
    private final GenreService genreService;
    private final MusicService musicService;
    private final ImageService imageService;
    private final UserFavoriteTrackRepository userFavoriteTrackRepository;
    private final UserServiceImpl userServiceImpl;

    public Track getTrackById(Long id) {
        return trackRepository.findById(id).orElseThrow();
    }

    public TrackDto getTrackDtoById(Long id) {
        return TrackDto.fromEntity(trackRepository.findById(id).orElseThrow());
    }

    public TrackDtoWithFavorite getTrackDtoById(Long id, String userId) {
        return TrackDtoWithFavorite.fromEntity(trackRepository.findById(id).orElseThrow(),
                userFavoriteTrackRepository.existsById(new UserFavoriteTrackKey(userId, id)));
    }

    public TrackSimpleDto getTrackSimpleDtoById(Long id) {
        return TrackSimpleDto.fromEntity(trackRepository.findById(id).orElseThrow());
    }

    public TrackSimpleDtoWithFavorite getTrackSimpleDtoById(Long id, String userId) {
        return TrackSimpleDtoWithFavorite.fromEntity(trackRepository.findById(id).orElseThrow(),
                userFavoriteTrackRepository.existsById(new UserFavoriteTrackKey(userId, id)));
    }

    @CacheEvict(cacheNames = {"track.findMostPlayedTracksThisWeek", "track.getRecommendedTracksToday",
            "track.findPopularTracksByAuthor", "track.findTracksByAuthorWithMultipleAuthors",
            "track.findPopularTracksByGenre", "track.findTracksByAlbum", "track.findTracksByPlaylist"}, allEntries = true)
    public void deleteTrack(Track track) {
        trackRepository.delete(track);
    }

    @Cacheable(value = "track.findMostPlayedTracksThisWeek",
            key = "'p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    public PageDto<TrackSimpleDto> findMostPlayedTracksThisWeek(Pageable pageable) {
        return new PageDto<>(trackRepository
                .findMostPlayedTracksThisWeek(pageable)
                .map(TrackSimpleDto::fromEntity));
    }

    @Cacheable(value = "track.getRecommendedTracksToday",
            key = "'p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<TrackSimpleDto> getRecommendedTracksToday(Pageable pageable) {
        return new PageDto<>(
                trackRepository
                        .findRecommendedTracksToday(pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }

    @Override
    public PageDto<TrackSimpleDto> findPopularTrackByUserRecentGenres(String userId, Pageable pageable) {
        return new PageDto<>(
                trackRepository
                        .findPopularTrackByUserRecentGenres(userId, pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }

    @Cacheable(value = "track.findPopularTracksByAuthor",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<TrackSimpleDto> findPopularTracksByAuthor(String authorId, Pageable pageable) {
        Author author = authorService.getAuthorById(authorId);
        return new PageDto<>(
                trackRepository
                        .findByAuthorsOrderByTotalPlaysDesc(author, pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }

    @Cacheable(value = "track.findTracksByAuthorWithMultipleAuthors",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<TrackSimpleDto> findTracksByAuthorWithMultipleAuthors(String authorId, Pageable pageable) {
        return new PageDto<>(
                trackRepository
                        .findTracksByAuthorWithMultipleAuthors(authorId, pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }

    @Cacheable(value = "track.findPopularTracksByGenre",
            key = "#genreId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<TrackSimpleDto> findPopularTracksByGenre(Long genreId, Pageable pageable) {
        return new PageDto<>(
                trackRepository
                        .findByGenres_IdOrderByTotalPlaysDesc(genreId, pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }

    @Cacheable(value = "track.findTracksByAlbum",
            key = "#albumId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<TrackSimpleDto> findTracksByAlbum(Long albumId, Pageable pageable) {
        return new PageDto<>(
                trackRepository
                        .findTracksByAlbum(albumId, pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }

    @Cacheable(value = "track.findTracksByPlaylist",
            key = "#playlistId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<TrackSimpleDto> findTracksByPlaylist(Long playlistId, Pageable pageable) {
        return new PageDto<>(
                trackRepository
                        .findTracksByPlaylist(playlistId, pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }

    @Override
    @CacheEvict(cacheNames = {
            "track.findPopularTracksByAuthor", "track.findTracksByAuthorWithMultipleAuthors"
    }, allEntries = true)
    public Track uploadTrack(TrackCreationDto creationDto, MultipartFile cover, MultipartFile file, Album album) {
        Track entity = new Track();
        entity.setImageURl(cover != null ? imageService.uploadImage(cover, creationDto.getTitle()) : null);
        entity.setTitle(creationDto.getTitle());
        entity.setGenres(new HashSet<>(genreService.getGenresByIds(creationDto.getGenreIds())));
        entity.setAuthors(new HashSet<>(authorService.getAuthorsByIds(creationDto.getAuthorIds())));
        entity.setAlbum(album);
        entity.setCreatedAt(OffsetDateTime.now());
        entity.setLikes(0L);
        entity.setTotalPlays(0L);
        musicService.uploadMusic(file, entity);
        return entity;
    }

    @Override
    public List<Track> uploadTracks(List<TrackCreationDto> creationDtos, List<MultipartFile> covers, List<MultipartFile> files, Album album) {
        List<Track> tracks = new ArrayList<>();
        creationDtos.forEach(trackCreationDto -> {
            tracks.add(uploadTrack(trackCreationDto,
                    covers.stream()
                            .filter(c -> c != null && Objects.equals(c.getOriginalFilename(), trackCreationDto.getClientCoverName()))
                            .findAny()
                            .orElse(null),
                    files.stream()
                            .filter(c -> c != null && Objects.equals(c.getOriginalFilename(), trackCreationDto.getClientFileName()))
                            .findAny()
                            .orElseThrow(),
                    album));
        });
        return tracks;
    }

    @Override
    public List<Long> getUserFavoriteFromTrackIds(String userId, List<Long> trackIds) {
        return userFavoriteTrackRepository.findTrackIdsByUserAndTrackIds(userId, trackIds);
    }

    @Override
    public void like(Long trackId, String userId) {
        UserFavoriteTrack entity = new UserFavoriteTrack();
        entity.setId(new UserFavoriteTrackKey(userId, trackId));
        entity.setUser(userServiceImpl.getUserById(userId));
        entity.setTrack(trackRepository.findById(trackId).orElseThrow());
        entity.setAddedAt(OffsetDateTime.now());
        userFavoriteTrackRepository.save(entity);
    }

    @Override
    public List<Track> getTracksByIds(List<Long> trackIds) {
        return trackRepository.findAllById(trackIds);
    }

    @Override
    public PageDto<TrackSimpleDto> getLikedTracksByUserId(String userId, Pageable pageable) {
        return new PageDto<>(
                trackRepository
                        .findLikedTracksByUserId(userId, pageable)
                        .map(TrackSimpleDto::fromEntity)
        );
    }
}
