package com.example.server.service.playlist;

import com.example.server.model.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface PlaylistService {
    Playlist getPlaylistsById(Long id);
    void createPlaylist(Playlist playlist);
    void deletePlaylist(Playlist playlist);
    Page<Playlist> findTopPlaylistsByFavorites(Pageable pageable);
    List<Playlist> getAllPlaylists();

    void addTrackToPlaylist(Long playlistId, Long trackId, int position);
}
