package com.example.server.data.repository;

import com.example.server.model.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query(
            value = """
        SELECT p.*, COUNT(ufp.user_id) AS favorite_count
        FROM playlists p
        LEFT JOIN user_favorite_playlists ufp ON p.id = ufp.playlist_id
        WHERE p.is_public = true
        GROUP BY p.id
        ORDER BY COUNT(ufp.user_id) DESC
        """,
            countQuery = """
        SELECT COUNT(*) FROM playlists
        WHERE is_public = true
        """,
            nativeQuery = true
    )
    Page<Playlist> findTopPlaylistsByFavorites(Pageable pageable);
}