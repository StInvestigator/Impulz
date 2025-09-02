package com.example.server.data.repository;

import com.example.server.model.Playlist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query(value = """
        SELECT p.* FROM playlists p
        LEFT JOIN user_favorite_playlists ufp ON p.id = ufp.playlist_id
        GROUP BY p.id
        ORDER BY COUNT(ufp.user_id) DESC
        LIMIT 20
        """, nativeQuery = true)
    List<Playlist> findTop20PlaylistsByFavorites();
}