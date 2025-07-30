package com.example.server.controller;

import com.example.server.model.Playlist;
import com.example.server.service.playlist.PlaylistService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    private final PlaylistService  playlistService;

    @Autowired
    public PlaylistController(PlaylistService playlistService) {
        this.playlistService = playlistService;
    }

    @GetMapping("/")
    public List<Playlist> getAllPlaylists() {
        return playlistService.getAllPlaylists();
    }
}
