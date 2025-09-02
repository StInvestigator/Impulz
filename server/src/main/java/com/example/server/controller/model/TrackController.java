package com.example.server.controller.model;

import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Track;
import com.example.server.service.music.MusicServiceImpl;
import com.example.server.service.track.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/tracks")
@RequiredArgsConstructor
public class TrackController {
    private final TrackService trackService;

    @GetMapping("/simpleDto/{id}")
    public TrackSimpleDto getSimpleTrackDto(@PathVariable Long id) {
        Track track = trackService.getTrackById(id);
        return TrackSimpleDto.fromEntity(track);
    }

    @GetMapping("/Dto/{id}")
    public TrackDto getTrackDto(@PathVariable Long id) {
        Track track = trackService.getTrackById(id);
        return TrackDto.fromEntity(track);
    }

    @GetMapping("/PopularByAuthor/{id}")
    public ResponseEntity<Page<TrackSimpleDto>> getPopularTracksByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            Page<Track> tracks = trackService.findPopularTracksByAuthor(id, pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

}