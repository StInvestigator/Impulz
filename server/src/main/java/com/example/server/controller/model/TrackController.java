package com.example.server.controller.model;

import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Album;
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

    @GetMapping("/ByAuthor/Popular/{id}")
    public ResponseEntity<Page<TrackSimpleDto>> getPopularTracksByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            Page<Track> tracks = trackService.findPopularTracksByAuthor(id, pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/Recommendations/Today")
    public ResponseEntity<Page<TrackSimpleDto>> getTodayRecommended(Pageable pageable) {
        try {
            Page<Track> tracks = trackService.getRecommendedTracksToday(pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/Recommendations/PersonalByGenres/{userId}")
    public ResponseEntity<Page<TrackSimpleDto>> getPersonalRecommended(@PathVariable String userId, Pageable pageable) {
        try {
            Page<Track> tracks = trackService.findPopularTrackByUserRecentGenres(userId, pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        }
        catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/MostListenedTracksOfWeek")
    public ResponseEntity<Page<TrackSimpleDto>> getMostListenedTracksByWeek(Pageable pageable) {
        try {
            Page<Track> tracks = trackService.findMostPlayedTracksThisWeek(pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        }
        catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ByAuthor/Collaborations/{id}")
    public ResponseEntity<Page<TrackSimpleDto>> getCollaborationsByAuthor(@PathVariable String id,Pageable pageable){
        try {
            Page<Track> tracks = trackService.findTracksByAuthorWithMultipleAuthors(id,pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        }
        catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ByGenre/Popular/{genreId}")
    public ResponseEntity<Page<TrackSimpleDto>> getPopularByGenre(@PathVariable Long genreId,Pageable pageable){
        try {
            Page<Track> tracks = trackService.findPopularTracksByGenre(genreId,pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        }
        catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ByAlbum/{albumId}")
    public ResponseEntity<Page<TrackSimpleDto>> getTracksByAlbum(@PathVariable Long albumId,Pageable pageable){
        try {
            Page<Track> tracks = trackService.findTracksByAlbum(albumId,pageable);
            Page<TrackSimpleDto> dtoPage = tracks.map(TrackSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        }
        catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}