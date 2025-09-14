package com.example.server.service.track_play;

import com.example.server.dto.TrackPlay.PlaybackRequest;

public interface TrackPlayService {
    void recordPlayback(PlaybackRequest request);
    Long getWeeklyPlaysCount(Long trackId);
    void cleanupOldSessions();
    int getCacheSize();
}
