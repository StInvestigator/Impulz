package com.example.server.controller.model;

import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Track;
import com.example.server.service.music.MusicServiceImpl;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/track")
@RequiredArgsConstructor
public class TrackController
{
    private final TrackRepository trackRepository;
    private final MusicServiceImpl musicService;

    @GetMapping("/simpleDto/{id}")
    public TrackSimpleDto getSimpleTrackDto(@PathVariable Long id){
        Track track = trackRepository.getTrackById(id);
        return TrackSimpleDto.fromEntity(track);
    }

    @GetMapping("/Dto/{id}")
    public TrackDto getTrackDto(@PathVariable Long id){
        Track track = trackRepository.getTrackById(id);
        return TrackDto.fromEntity(track,musicService);
    }

    @GetMapping("/get20MostListenedTracksByWeek")
    public List<TrackSimpleDto> get20MostListenedTracksByWeek(){
        List<Track> tracks = trackRepository.findTop20MostPlayedTracksThisWeek();
        return tracks.stream()
                .map(TrackSimpleDto::fromEntity)
                .collect(Collectors.toList());
    }

}