package com.example.server.service.track;

import com.example.server.model.Author;
import com.example.server.model.Track;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.Collection;
import java.util.List;

public interface TrackService
{
    Track getTrackById(Long id);
    void createTrack(Track track);
    Track createTrack(String title, Long albumId, List<String> authorIds,List<Long> genreIds);
    void deleteTrack(Track track);
    Track findTrackByFileUrl(String fileUrl);
    Page<Track> findMostPlayedTracksThisWeek(Pageable pageable);
    Page<Track> getRecommendedTracksToday(Pageable pageable);
    Page<Track> findPopularTrackByUserRecentGenres(String userId, Pageable pageable);
    Page<Track> findPopularTracksByAuthor(String authorId, Pageable pageable);
    Page<Track> findTracksByAuthorWithMultipleAuthors(String authorId, Pageable pageable);
    Page<Track> findPopularTracksByGenre(Long genreId, Pageable pageable);
}
