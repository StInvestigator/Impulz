package com.example.server.service.track;

import com.example.server.model.Track;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface TrackService
{
    Track getTrackById(Long id);
    void createTrack(Track track);
    Track createTrack(String title, Long albumId, List<String> authorIds,List<Long> genreIds);
    void deleteTrack(Track track);
    Track findTrackByFileUrl(String fileUrl);
    List<Track> findTop20MostPlayedTracksThisWeek();
    List<Track> getRecommendedTracksToday();
    List<Track> findPopularTrackByUserRecentGenres(String userId);
}
