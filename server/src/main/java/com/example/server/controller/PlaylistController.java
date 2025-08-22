package com.example.server.controller;

import com.example.server.model.Playlist;
import com.example.server.service.playlist.PlaylistServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/playlists")
public class PlaylistController {

    private final PlaylistServiceImpl playlistServiceImpl;

    @Autowired
    public PlaylistController(PlaylistServiceImpl playlistServiceImpl) {
        this.playlistServiceImpl = playlistServiceImpl;
    }

    @GetMapping("/")
    public List<Playlist> getAllPlaylists() {
        return playlistServiceImpl.getAllPlaylists();
    }
}
