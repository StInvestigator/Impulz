package com.example.server.controller;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Author.AuthorSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Track.TrackSimpleDto;
import com.example.server.service.elasticsearch.SearchService;
import jakarta.ws.rs.NotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@Slf4j
public class SearchController {
    private final SearchService searchService;

//    @GetMapping
//    public ResponseEntity<?> searchAll(@RequestParam String q) {
//        log.info("=== SEARCH CONTROLLER CALLED ===");
//        log.info("Query: {}", q);
//
//        try {
//            log.info("Calling searchService...");
//            GlobalSearchResult result = searchService.searchAll(q);
//            log.info("Search completed successfully");
//            return ResponseEntity.ok(result);
//        } catch (Exception e) {
//            log.error("Error in search controller: ", e);
//            return ResponseEntity.status(500).body("Search error: " + e.getMessage());
//        }
//    }

    @GetMapping("/tracks")
    public ResponseEntity<PageDto<TrackSimpleDto>> searchTracks(@RequestParam String q, Pageable pageable) {
        try {
            return ResponseEntity.ok(searchService.searchTracks(searchService.normalizeQuery(q), pageable));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error in search controller: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/authors")
    public ResponseEntity<PageDto<AuthorSimpleDto>> searchAuthors(@RequestParam String q, Pageable pageable) {
        try {
            return ResponseEntity.ok(searchService.searchAuthors(searchService.normalizeQuery(q), pageable));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error in search controller: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/albums")
    public ResponseEntity<PageDto<AlbumSimpleDto>> searchAlbums(@RequestParam String q, Pageable pageable) {
        try {
            return ResponseEntity.ok(searchService.searchAlbums(searchService.normalizeQuery(q), pageable));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error in search controller: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }

    @GetMapping("/playlists/public")
    public ResponseEntity<PageDto<PlaylistDto>> searchPublicPlaylists(@RequestParam String q, Pageable pageable) {
        try {
            return ResponseEntity.ok(searchService.searchPublicPlaylists(searchService.normalizeQuery(q), pageable));
        } catch (NotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            log.error("Error in search controller: ", e);
            return ResponseEntity.internalServerError().build();
        }
    }
}
