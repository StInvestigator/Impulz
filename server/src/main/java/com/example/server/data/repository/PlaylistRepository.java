package com.example.server.data.repository;

import com.example.server.model.Playlist;
import com.example.server.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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
        WHERE p.is_public = true
        GROUP BY p.id
        ORDER BY favorite_count DESC
        """,
            countQuery = """
        SELECT COUNT(*) FROM playlists
        WHERE is_public = true
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
    List<Playlist> findAllByOwnerIdOrderByCreatedAtDesc(String userId);

    @Query(
            value = """
        SELECT p.*
        FROM playlists p
        JOIN user_favorite_playlists ufp ON p.id = ufp.playlist_id
        WHERE ufp.user_id = :userId
        ORDER BY ufp.added_at DESC
        """,
            countQuery = """
        SELECT COUNT(*)
        FROM playlists p
        JOIN user_favorite_playlists ufp ON p.id = ufp.playlist_id
        WHERE ufp.user_id = :userId
        """,
            nativeQuery = true
    )
    Page<Playlist> findAllByFavoredByUserId(String userId, Pageable pageable);
    Page<Playlist> findAllByOwnerIdAndIsPublicTrue(String ownerId, Pageable pageable);

    @Query(
            value = """
        UPDATE playlist_tracks
        SET position = position - 1
        WHERE playlist_id = :playlistId AND position > :position
        """,
            nativeQuery = true
    )
    @Modifying
    void correctTracksPositionsAfterRemovingTrack(Long playlistId, int position);


    @Query(
            value = """
                    UPDATE playlist_tracks
                    SET position = CASE
                        WHEN :position < :old_position THEN position + 1
                        WHEN :position > :old_position THEN position - 1
                        ELSE position
                    END
                    WHERE playlist_id = :playlistId
                      AND position BETWEEN LEAST(:position, :old_position) AND GREATEST(:position, :old_position)
                      AND position <> :old_position
                    """,
            nativeQuery = true
    )
    @Modifying
    void correctTracksPositionsAfterChangingPosition(Long playlistId, int position, int old_position);

    Long findPlaylistIdByTitleAndOwnerId(String title, String userId);

    @Query(
            value = """
        SELECT DISTINCT p.*
        FROM playlists p
        JOIN playlist_tracks pt ON pt.playlist_id = p.id
        JOIN tracks t ON t.id = pt.track_id
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id = :genreId
          AND p.is_public = true
        ORDER BY p.created_at DESC NULLS LAST
        """,
            countQuery = """
        SELECT COUNT(DISTINCT p.id)
        FROM playlists p
        JOIN playlist_tracks pt ON pt.playlist_id = p.id
        JOIN tracks t ON t.id = pt.track_id
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id = :genreId
          AND p.is_public = true
        """,
            nativeQuery = true
    )
    Page<Playlist> findRecentPublicPlaylistsByGenre(@Param("genreId") Long genreId, Pageable pageable);
}