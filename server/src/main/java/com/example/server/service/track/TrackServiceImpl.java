package com.example.server.service.track;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.data.repository.GenreRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Author;
import com.example.server.model.Genre;
import com.example.server.model.Track;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.OffsetDateTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TrackServiceImpl implements TrackService {
    private final TrackRepository trackRepository;
    private final AlbumRepository albumRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public Track getTrackById(Long id) {
        return trackRepository.findById(id).orElseThrow();
    }

    public TrackDto getTrackDtoById(Long id) {
        return TrackDto.fromEntity(trackRepository.findById(id).orElseThrow());
    }

    public TrackSimpleDto getTrackSimpleDtoById(Long id) {
        return TrackSimpleDto.fromEntity(trackRepository.findById(id).orElseThrow());
    }

    @CacheEvict(cacheNames = {
            "track.findPopularTracksByAuthor", "track.findTracksByAuthorWithMultipleAuthors"
    }, allEntries = true)
    public void createTrack(Track track) {
        trackRepository.save(track);
    }

    @CacheEvict(cacheNames = {
            "track.findPopularTracksByAuthor", "track.findTracksByAuthorWithMultipleAuthors"
    }, allEntries = true)
    public Track createTrack(String title, Long albumId, List<String> authorIds, List<Long> genreIds) {
        Track track = new Track();
        track.setTitle(title);
        track.setLikes(0L);
        track.setTotalPlays(0L);
        track.setCreatedAt(OffsetDateTime.now());

        track.setAlbum(albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + albumId)));

        if (authorIds != null && !authorIds.isEmpty()) {
            Set<Author> authors = new HashSet<>(authorRepository.findAllById(authorIds));
            track.setAuthors(authors);
        }

        if (genreIds != null & !genreIds.isEmpty()) {
            Set<Genre> genres = new HashSet<>(genreRepository.findAllById(genreIds));
            track.setGenres(genres);
        }

        return track;
    }

    @CacheEvict(cacheNames = {"track.findMostPlayedTracksThisWeek", "track.getRecommendedTracksToday",
            "track.findPopularTracksByAuthor", "track.findTracksByAuthorWithMultipleAuthors",
            "track.findPopularTracksByGenre", "track.findTracksByAlbum"}, allEntries = true)
    public void deleteTrack(Track track) {
        trackRepository.delete(track);
    }

    public Track findTrackByFileUrl(String fileUrl) {
        return trackRepository.findTrackByFileUrl(fileUrl);
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
        Author author = authorRepository.findById(authorId)
                .orElseThrow(() -> new RuntimeException("Author not found with id: " + authorId));
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
}
