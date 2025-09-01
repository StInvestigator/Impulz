package com.example.server.service.track;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.data.repository.GenreRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Author;
import com.example.server.model.Genre;
import com.example.server.model.Track;
import lombok.RequiredArgsConstructor;
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
        return trackRepository.getTrackById(id);
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

    public List<Track> findTop20MostPlayedTracksThisWeek() {
        return trackRepository.findTop20MostPlayedTracksThisWeek();
    }

    public List<Track> getRecommendedTracksToday() {
        return trackRepository.findRecommendedTracksToday();
    }

    public List<Track> findPopularTrackByUserRecentGenres(String userId){
        return trackRepository.findPopularTrackByUserRecentGenres(userId);
    }
}
