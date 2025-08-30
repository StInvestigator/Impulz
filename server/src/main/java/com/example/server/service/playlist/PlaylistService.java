package com.example.server.service.playlist;

import com.example.server.model.Playlist;

import java.util.List;

public interface PlaylistService {
    Playlist getPlaylistsById(Long id);
    List<Playlist> getAllPlaylists();

    void addTrackToPlaylist(Long playlistId, Long trackId, int position);
}
