package com.example.server.controller.model;

import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.model.Album;
import com.example.server.service.album.AlbumService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/ByAuthor/Recent/{userId}")
    public ResponseEntity<PageDto<AlbumSimpleDto>> getRecentByAuthor(@PathVariable String userId, Pageable pageable) {
        try {
            return ResponseEntity.ok(albumService.findByAuthorOrderByReleaseDateDesc(userId, pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
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
            return ResponseEntity.internalServerError().build();
        }
    }

}