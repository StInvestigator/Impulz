package com.example.server.controller.model;

import com.example.server.dto.TrackPlay.PlaybackRequest;
import com.example.server.service.track_play.TrackPlayServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/tracks")
@RequiredArgsConstructor
public class TrackPlayController
{
    private final TrackPlayServiceImpl trackPlayServiceImpl;

    @PostMapping("/playback")
    public ResponseEntity<Void> recordPlayback(@RequestBody PlaybackRequest request) {
        trackPlayServiceImpl.recordPlayback(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{trackId}/weekly-plays")
    public ResponseEntity<Long> getWeeklyPlays(@PathVariable Long trackId) {
        Long playsCount = trackPlayServiceImpl.getWeeklyPlaysCount(trackId);
        return ResponseEntity.ok(playsCount);
    }

}
