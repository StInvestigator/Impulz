package com.example.server.controller;

import com.example.server.dto.Search.GlobalSearchResult;
import com.example.server.elasticsearch.document.*;
import com.example.server.service.elasticsearch.SearchService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/search")
@RequiredArgsConstructor
@Slf4j
public class SearchController
{
    private final SearchService searchService;

    @GetMapping
    public ResponseEntity<?> searchAll(@RequestParam String q) {
        log.info("=== SEARCH CONTROLLER CALLED ===");
        log.info("Query: {}", q);

        try {
            log.info("Calling searchService...");
            GlobalSearchResult result = searchService.searchAll(q);
            log.info("Search completed successfully");
            return ResponseEntity.ok(result);
        } catch (Exception e) {
            log.error("Error in search controller: ", e);
            return ResponseEntity.status(500).body("Search error: " + e.getMessage());
        }
    }

    @GetMapping("/tracks")
    public ResponseEntity<List<TrackDocument>> searchTracks(@RequestParam String q) {
        List<TrackDocument> tracks = searchService.searchTracks(q);
        return ResponseEntity.ok(tracks);
    }

    @GetMapping("/authors")
    public ResponseEntity<List<AuthorDocument>> searchAuthors(@RequestParam String q) {
        List<AuthorDocument> authors = searchService.searchAuthors(q);
        return ResponseEntity.ok(authors);
    }

    @GetMapping("/albums")
    public ResponseEntity<List<AlbumDocument>> searchAlbums(@RequestParam String q) {
        List<AlbumDocument> albums = searchService.searchAlbums(q);
        return ResponseEntity.ok(albums);
    }

    @GetMapping("/playlists/public")
    public ResponseEntity<List<PlaylistDocument>> searchPublicPlaylists(@RequestParam String q) {
        List<PlaylistDocument> playlists = searchService.searchPublicPlaylists(q);
        return ResponseEntity.ok(playlists);
    }
}
