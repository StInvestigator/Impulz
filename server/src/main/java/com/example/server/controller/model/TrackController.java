package com.example.server.controller.model;

import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Track;
import com.example.server.service.music.MusicServiceImpl;
import com.example.server.service.track.TrackService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/track")
@RequiredArgsConstructor
public class TrackController
{
    private final TrackService trackService;

    @GetMapping("/simpleDto/{id}")
    public TrackSimpleDto getSimpleTrackDto(@PathVariable Long id){
        Track track = trackService.getTrackById(id);
        return TrackSimpleDto.fromEntity(track);
    }

    @GetMapping("/Dto/{id}")
    public TrackDto getTrackDto(@PathVariable Long id){
        Track track = trackService.getTrackById(id);
        return TrackDto.fromEntity(track);
    }

}