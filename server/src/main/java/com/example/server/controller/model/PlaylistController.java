package com.example.server.controller.model;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.Playlist;
import com.example.server.service.playlist.PlaylistService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/playlist")
@RequiredArgsConstructor
public class PlaylistController {
    private final PlaylistService playlistService;

    @GetMapping("/simpleDto/{id}")
    public PlaylistSimpleDto getPlaylistSimpleDto(@PathVariable Long id){
        Playlist playlist = playlistService.getPlaylistsById(id);
        return PlaylistSimpleDto.fromEntity(playlist);
    }

    @GetMapping("/Dto/{id}")
    public PlaylistDto getPlaylistDto(@PathVariable Long id){
        Playlist playlist = playlistService.getPlaylistsById(id);
        return PlaylistDto.fromEntity(playlist);
    }
}