package com.example.server.controller.model;

import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.service.playlist.PlaylistService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Objects;

@Slf4j
@RestController
@RequestMapping("/playlists")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService playlistService;

    @GetMapping("/simpleDto/{id}")
    public PlaylistSimpleDto getPlaylistSimpleDto(@PathVariable Long id) {
        return playlistService.getPlaylistSimpleDtoById(id);
    }

    @GetMapping("/Dto/{id}")
    public PlaylistDto getPlaylistDto(@PathVariable Long id) {
        return playlistService.getPlaylistDtoById(id);
    }

    @GetMapping("/TopPlaylistsByFavorites")
    public ResponseEntity<PageDto<PlaylistSimpleDto>> findTopPlaylistsByFavorites(Pageable pageable) {
        try {
            return ResponseEntity.ok(playlistService.findTopPlaylistsByFavorites(pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByGenre/Recent/{genreId}")
    public ResponseEntity<PageDto<PlaylistSimpleDto>> getRecentByGenre(@PathVariable Long genreId, Pageable pageable) {
        try {
            return ResponseEntity.ok(playlistService.findRecentPublicPlaylistsByGenre(genreId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/create")
    public ResponseEntity<?> createPlaylist(@RequestPart("userId") String userId,
                                            @RequestPart("title") String title,
                                            @RequestPart("isPublic") String isPublic,
                                            @RequestPart(value = "img", required = false) MultipartFile image) {
        try {
            playlistService.create(title, userId, Objects.equals(isPublic.toLowerCase(), "true"), image);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePlaylist(@PathVariable Long id) {
        try {
            playlistService.deletePlaylistById(id);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/addTrack")
    public ResponseEntity<?> addTrackToPlaylist(@RequestParam("playlistId") Long playListId,
                                                @RequestParam("trackId") Long trackId) {
        try {
            playlistService.addTrackToPlaylist(playListId, trackId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/changeTrackPosition")
    public ResponseEntity<?> changeTrackPosition(@RequestPart("playlistId") Long playListId,
                                                 @RequestPart("trackId") Long trackId,
                                                 @RequestPart("position") Integer position) {
        try {
            playlistService.changeTrackPosition(playListId, trackId, position);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @DeleteMapping("/removeTrack/{playlistId}/{trackId}")
    public ResponseEntity<?> removeTrackFromPlaylist(@PathVariable Long playlistId, @PathVariable Long trackId) {
        try {
            playlistService.removeTrackFromPlaylist(playlistId, trackId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ownForUser/{userId}")
    public ResponseEntity<List<PlaylistSimpleDto>> getOwnForUser(@PathVariable String userId) {
        try {
            return ResponseEntity.ok(playlistService.getAllPlaylistsByOwnerId(userId));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/favoriteByUser/{userId}")
    public ResponseEntity<Page<PlaylistSimpleDto>> getFavoriteForUser(@PathVariable String userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(playlistService.getPlaylistsFavorite(userId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/publicFromUser/{userId}")
    public ResponseEntity<Page<PlaylistSimpleDto>> getPublicPlaylistsFromUser(@PathVariable String userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(playlistService.getPublicPlaylistsByOwnerId(userId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}