package com.example.server.controller.model;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.Playlist;
import com.example.server.service.playlist.PlaylistService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/playlists")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService playlistService;

    @GetMapping("/simpleDto/{id}")
    public PlaylistSimpleDto getPlaylistSimpleDto(@PathVariable Long id){
        return playlistService.getPlaylistSimpleDtoById(id);
    }

    @GetMapping("/Dto/{id}")
    public PlaylistDto getPlaylistDto(@PathVariable Long id){
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

}