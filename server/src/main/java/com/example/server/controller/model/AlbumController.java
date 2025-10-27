package com.example.server.controller.model;

import com.example.server.dto.Album.AlbumCreationDto;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.service.album.AlbumService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    @GetMapping("/simpleDto/{id}")
    public AlbumSimpleDto getAlbumSimpleDto(@PathVariable Long id) {
        return albumService.getAlbumSimpleDtoById(id);
    }

    @GetMapping("/Dto/{id}")
    public AlbumDto getAlbumDto(@PathVariable Long id) {
        return albumService.getAlbumDtoById(id);
    }

    @GetMapping("/ByAuthor/{id}")
    public ResponseEntity<PageDto<AlbumSimpleDto>> getAlbumsByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.findByAuthor(id, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByAuthor/Collaborations/{id}")
    public ResponseEntity<PageDto<AlbumSimpleDto>> getCollaborationsByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.findCollaborationsByAuthor(id, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByAuthor/Recent/{userId}")
    public ResponseEntity<PageDto<AlbumSimpleDto>> getRecentByAuthor(@PathVariable String userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.findByAuthorOrderByReleaseDateDesc(userId, pageable));
        } catch (EntityNotFoundException e) {
            log.error(e.getMessage());
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/Recommendations/Today")
    public ResponseEntity<PageDto<AlbumSimpleDto>> getTodayRecommended(Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.getRecommendedAlbumsToday(pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/Recommendations/PersonalByGenres/{userId}")
    public ResponseEntity<PageDto<AlbumSimpleDto>> getPersonalRecommended(@PathVariable String userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.findPopularAlbumsByUserRecentGenres(userId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByGenre/Recent/{genreId}")
    public ResponseEntity<PageDto<AlbumSimpleDto>> getRecentByGenre(@PathVariable Long genreId, Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.findNewAlbumsByGenre(genreId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PreAuthorize("hasRole('AUTHOR')")
    @PostMapping(value = "/create")
    public ResponseEntity<?> createAlbum(@RequestPart("metadata") AlbumCreationDto metadata,
                                         @RequestPart(value="cover", required = false) MultipartFile cover,
                                         @RequestPart(value="trackFiles", required = false) List<MultipartFile> trackFiles,
                                         @RequestPart(value="trackCovers", required = false) List<MultipartFile> trackCovers) {
        try {
            albumService.upload(metadata, cover, trackFiles, trackCovers);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PreAuthorize("hasRole({'AUTHOR', 'MODERATOR', 'ADMIN'})")
    @DeleteMapping("/delete/{albumId}")
    public ResponseEntity<?> deleteAlbum(@PathVariable Long albumId) {
        try {
            albumService.delete(albumId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/favoriteByUser/{userId}")
    public ResponseEntity<Page<AlbumSimpleDto>> getFavoriteByUser(@PathVariable String userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.findFavoriteByUserId(userId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }

    @PostMapping("/like")
    public ResponseEntity<?> addToLiked(@RequestParam("userId") String userId,
                                        @RequestParam("albumId") Long albumId) {
        try {
            albumService.like(albumId, userId);
            return ResponseEntity.ok().build();
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error(e.getMessage());
            return ResponseEntity.internalServerError().build();
        }
    }
}