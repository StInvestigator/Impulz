package com.example.server.service.track;

import com.example.server.model.Track;

import java.util.List;

public interface TrackService
{
    Track getTrackById(Long id);
    Track findTrackByFileUrl(String fileUrl);
    List<Track> findTop20MostPlayedTracksThisWeek();
}
