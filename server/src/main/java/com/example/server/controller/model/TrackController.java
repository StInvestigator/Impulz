package com.example.server.controller.model;

import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Track.TrackDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.Track;
import com.example.server.service.music.MusicServiceImpl;
import com.example.server.service.track.TrackService;
import jakarta.persistence.EntityNotFoundException;
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
        return trackService.getTrackSimpleDtoById(id);
    }

    @GetMapping("/Dto/{id}")
    public TrackDto getTrackDto(@PathVariable Long id) {
        return trackService.getTrackDtoById(id);
    }

    @GetMapping("/ByAuthor/Popular/{id}")
    public ResponseEntity<PageDto<TrackSimpleDto>> getPopularTracksByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            return ResponseEntity.ok(trackService.findPopularTracksByAuthor(id, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/Recommendations/Today")
    public ResponseEntity<PageDto<TrackSimpleDto>> getTodayRecommended(Pageable pageable) {
        try {
            return ResponseEntity.ok(trackService.getRecommendedTracksToday(pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/Recommendations/PersonalByGenres/{userId}")
    public ResponseEntity<PageDto<TrackSimpleDto>> getPersonalRecommended(@PathVariable String userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(trackService.findPopularTrackByUserRecentGenres(userId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/MostListenedTracksOfWeek")
    public ResponseEntity<PageDto<TrackSimpleDto>> getMostListenedTracksByWeek(Pageable pageable) {
        try {
            return ResponseEntity.ok(trackService.findMostPlayedTracksThisWeek(pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByAuthor/Collaborations/{id}")
    public ResponseEntity<PageDto<TrackSimpleDto>> getCollaborationsByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            return ResponseEntity.ok(trackService.findTracksByAuthorWithMultipleAuthors(id, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByGenre/Popular/{genreId}")
    public ResponseEntity<PageDto<TrackSimpleDto>> getPopularByGenre(@PathVariable Long genreId, Pageable pageable) {
        try {
            return ResponseEntity.ok(trackService.findPopularTracksByGenre(genreId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByAlbum/{albumId}")
    public ResponseEntity<PageDto<TrackSimpleDto>> getTracksByAlbum(@PathVariable Long albumId, Pageable pageable) {
        try {
            return ResponseEntity.ok(trackService.findTracksByAlbum(albumId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}