package com.example.server.data.repository;

import com.example.server.model.Playlist;
import com.example.server.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
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

    @Query(
            value = """
        SELECT p.*
        FROM playlists p
        LEFT JOIN user_favorite_playlists ufp ON p.id = ufp.playlist_id
        WHERE p.owner_id = :userId or ufp.user_id = :userId
        GROUP BY p.id
        """,
            nativeQuery = true
    )
    List<Playlist> findAllByOwnerIdOrFavoredByUserId(String userId);
    List<Playlist> findAllByOwnerIdAndIsPublicTrue(String ownerId);

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
}