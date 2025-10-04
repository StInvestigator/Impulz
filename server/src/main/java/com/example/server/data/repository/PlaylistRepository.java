package com.example.server.data.repository;

import com.example.server.model.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface PlaylistRepository extends JpaRepository<Playlist, Long> {

    @Query(
            value = """
        SELECT p.*, COUNT(ufp.user_id) AS favorite_count
        FROM playlists p
        LEFT JOIN user_favorite_playlists ufp ON p.id = ufp.playlist_id
        GROUP BY p.id
        ORDER BY COUNT(ufp.user_id) DESC
        """,
            countQuery = """
        SELECT COUNT(*) FROM playlists
        """,
            nativeQuery = true
    )
    Page<Playlist> findTopPlaylistsByFavorites(Pageable pageable);

    @Query("SELECT DISTINCT p FROM Playlist p LEFT JOIN FETCH p.owner")
    List<Playlist> findAllWithOwner();

    @Query("SELECT p FROM Playlist p LEFT JOIN FETCH p.owner WHERE p.id = :id")
    Optional<Playlist> findByIdWithOwner(@Param("id") Long id);

    @Query("SELECT DISTINCT p FROM Playlist p LEFT JOIN FETCH p.owner WHERE p.id IN :ids")
    List<Playlist> findAllWithOwnerByIds(@Param("ids") List<Long> ids);
}