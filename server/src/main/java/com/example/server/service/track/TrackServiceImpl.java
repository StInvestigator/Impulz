package com.example.server.service.track;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.data.repository.GenreRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Author;
import com.example.server.model.Genre;
import com.example.server.model.Track;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
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
public class TrackServiceImpl implements TrackService
{
    private final TrackRepository trackRepository;
    private final AlbumRepository albumRepository;
    private final AuthorRepository authorRepository;
    private final GenreRepository genreRepository;

    public Track getTrackById(Long id) {
        return trackRepository.findById(id).orElseThrow();
    }

    public void createTrack(Track track){
        trackRepository.save(track);
    }

    public Track createTrack(String title, Long albumId, List<String> authorIds,List<Long> genreIds){
        Track track = new Track();
        track.setTitle(title);
        track.setLikes(0L);
        track.setTotalPlays(0L);
        track.setCreatedAt(OffsetDateTime.now());

        track.setAlbum(albumRepository.findById(albumId)
                .orElseThrow(() -> new RuntimeException("Album not found with id: " + albumId)));

        if(authorIds != null && !authorIds.isEmpty()){
            Set<Author> authors = new HashSet<>(authorRepository.findAllById(authorIds));
            track.setAuthors(authors);
        }

        if(genreIds != null & !genreIds.isEmpty()){
            Set<Genre> genres = new HashSet<>(genreRepository.findAllById(genreIds));
            track.setGenres(genres);
        }

        return track;
    }

    public void deleteTrack(Track track){
        trackRepository.delete(track);
    }

    public Track findTrackByFileUrl(String fileUrl) {
        return trackRepository.findTrackByFileUrl(fileUrl);
    }

    public Page<Track> findMostPlayedTracksThisWeek(Pageable pageable) {
        return trackRepository.findMostPlayedTracksThisWeek(pageable);
    }

    public Page<Track> getRecommendedTracksToday(Pageable pageable) {
        return trackRepository.findRecommendedTracksToday(pageable);
    }

    public Page<Track> findPopularTrackByUserRecentGenres(String userId, Pageable pageable){
        return trackRepository.findPopularTrackByUserRecentGenres(userId, pageable);
    }

    public Page<Track> findPopularTracksByAuthor(String authorId, Pageable pageable) throws RuntimeException {
        Author author = authorRepository.findById(authorId).orElseThrow(() -> new RuntimeException("Author not found with id: " + authorId));
        return trackRepository.findByAuthorsOrderByTotalPlaysDesc(author, pageable);
    }

    public Page<Track> findTracksByAuthorWithMultipleAuthors(String authorId, Pageable pageable){
        return trackRepository.findTracksByAuthorWithMultipleAuthors(authorId,pageable);
    }
}
