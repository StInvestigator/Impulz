package com.example.server.controller.model;

import com.example.server.dto.TrackPlay.PlaybackRequest;
import com.example.server.service.track_play.TrackPlayService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/tracks")
@RequiredArgsConstructor
public class TrackPlayController
{
    private final TrackPlayService trackPlayService;

    @PostMapping("/playback")
    public ResponseEntity<Void> recordPlayback(@RequestBody PlaybackRequest request) {
        trackPlayService.recordPlayback(request);
        return ResponseEntity.ok().build();
    }

    @GetMapping("/{trackId}/weekly-plays")
    public ResponseEntity<Long> getWeeklyPlays(@PathVariable Long trackId) {
        Long playsCount = trackPlayService.getWeeklyPlaysCount(trackId);
        return ResponseEntity.ok(playsCount);
    }

}
