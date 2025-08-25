package com.example.server.data.repository;

import com.example.server.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {
    Playlist getPlaylistsById(Long id);
}