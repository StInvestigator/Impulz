package com.example.server.controller.model;

import com.example.server.dto.TrackPlay.PlaybackRequest;
import com.example.server.service.track_play.TrackPlayServiceImpl;
import jakarta.persistence.EntityNotFoundException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("/tracks")
@RequiredArgsConstructor
@Validated
public class TrackPlayController
{
    private final TrackPlayServiceImpl trackPlayServiceImpl;

    @PostMapping("/playback")
    public ResponseEntity<Void> recordPlayback(@Valid @RequestBody PlaybackRequest request) {
        try {
            trackPlayServiceImpl.recordPlayback(request);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/{trackId}/weekly-plays")
    public ResponseEntity<Long> getWeeklyPlays(@PathVariable Long trackId) {
        try {
            Long playsCount = trackPlayServiceImpl.getWeeklyPlaysCount(trackId);
            return ResponseEntity.ok(playsCount);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

}
