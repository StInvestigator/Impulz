package com.example.server.controller.model;

import com.example.server.dto.Track.*;
import com.example.server.service.track.TrackService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.stream.Collectors;

@Slf4j
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

    @GetMapping("/simpleDtoWithFavorite/{id}")
    public TrackSimpleDtoWithFavorite getSimpleTrackDtoWithFavorite(@PathVariable Long id, String userId) {
        return trackService.getTrackSimpleDtoById(id, userId);
    }

    @GetMapping("/DtoWithFavorite/{id}")
    public TrackDtoWithFavorite getTrackDtoWithFavorite(@PathVariable Long id, String userId) {
        return trackService.getTrackDtoById(id, userId);
    }

    @GetMapping("/ByAuthor/Popular/{id}")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getPopularTracksByAuthor(@PathVariable String id, Pageable pageable, String userId) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.findPopularTracksByAuthor(id, pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/Recommendations/Today")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getTodayRecommended(Pageable pageable, String userId) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.getRecommendedTracksToday(pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/Recommendations/PersonalByGenres/{userId}")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getPersonalRecommended(@PathVariable String userId, Pageable pageable) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.findPopularTrackByUserRecentGenres(userId, pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/MostListenedTracksOfWeek")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getMostListenedTracksByWeek(Pageable pageable, String userId) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.findMostPlayedTracksThisWeek(pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByAuthor/Collaborations/{id}")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getCollaborationsByAuthor(@PathVariable String id, Pageable pageable, String userId) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.findTracksByAuthorWithMultipleAuthors(id, pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByGenre/Popular/{genreId}")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getPopularByGenre(@PathVariable Long genreId, Pageable pageable, String userId) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.findPopularTracksByGenre(genreId, pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByAlbum/{albumId}")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getTracksByAlbum(@PathVariable Long albumId, Pageable pageable, String userId) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.findTracksByAlbum(albumId, pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByPlaylist/{playlistId}")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getTracksByPlaylist(@PathVariable Long playlistId, Pageable pageable, String userId) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.findTracksByPlaylist(playlistId, pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/like")
    public ResponseEntity<?> addToLiked(@RequestParam("userId") String userId,
                                        @RequestParam("trackId") Long trackId) {
        try {
            trackService.like(trackId, userId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
    @GetMapping("/liked/{userId}")
    public ResponseEntity<PageTrackSimpleDtoWithFavorite> getLikedTracksByUserId(
            @PathVariable String userId,
            Pageable pageable) {
        try {
            PageTrackSimpleDtoWithFavorite pts = new PageTrackSimpleDtoWithFavorite();
            pts.setPage(trackService.getLikedTracksByUserId(userId, pageable));
            pts.setFavoriteIds(trackService.getUserFavoriteFromTrackIds(userId,
                    pts.getPage().getContent().stream().map(TrackSimpleDto::getId).collect(Collectors.toList())));
            return ResponseEntity.ok(pts);
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

}