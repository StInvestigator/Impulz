package com.example.server.service.track_play;

import com.example.server.data.repository.TrackPlayRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.data.repository.UserRepository;
import com.example.server.dto.TrackPlay.PlaybackRequest;
import com.example.server.model.Track;
import com.example.server.model.TrackPlay;
import com.example.server.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.security.core.Authentication;

import java.time.OffsetDateTime;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class TrackPlayService {
    private final TrackPlayRepository trackPlayRepository;
    private final TrackRepository trackRepository;
    private final UserRepository userRepository;

    @Async
    @Transactional
    public void recordPlayback(PlaybackRequest request) {
        String userId = request.getUserId();
        Optional<Track> trackOpt = trackRepository.findById(request.getTrackId());
        if (trackOpt.isEmpty()) {
            return;
        }

        Track track = trackOpt.get();
        double currentTime = request.getCurrentTime();
        double trackDuration = track.getDurationSec();

        boolean shouldRecord = currentTime >= 30 || currentTime >= trackDuration;

        if (shouldRecord) {
            createAndSaveTrackPlay(track, userId);
        }
    }

    private void createAndSaveTrackPlay(Track track, String userId) {
        TrackPlay trackPlay = new TrackPlay();
        trackPlay.setTrack(track);
        trackPlay.setPlayedAt(OffsetDateTime.now());

        if (userId != null) {
            Optional<User> userOpt = userRepository.findById(userId);
            userOpt.ifPresent(trackPlay::setUser);
        }

        trackPlayRepository.save(trackPlay);
        trackRepository.incrementTotalPlays(track.getId());
    }

    public Long getWeeklyPlaysCount(Long trackId) {
        return trackPlayRepository.countWeeklyPlaysByTrackIdNative(trackId);
    }
}