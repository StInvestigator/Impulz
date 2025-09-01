package com.example.server.data.repository;

import com.example.server.model.Album;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album,Long>
{
    Album getAlbumById(Long id);

    @Query(value = """
    SELECT a.* FROM albums a
    LEFT JOIN tracks t ON t.album_id = a.id
    LEFT JOIN track_plays tp ON tp.track_id = t.id
    WHERE tp.played_at >= CURRENT_DATE - INTERVAL '30 days'
    GROUP BY a.id
    ORDER BY COUNT(tp.id) DESC
    LIMIT 10
    """, nativeQuery = true)
    List<Album> findRecommendedAlbumsToday();

    @Query(value = """
    WITH user_recent_genres AS (
        SELECT DISTINCT tg.genre_id, MAX(tp.played_at) as last_played
        FROM track_plays tp
        JOIN track_genres tg ON tg.track_id = tp.track_id
        WHERE tp.user_id = :userId
        GROUP BY tg.genre_id
        ORDER BY last_played DESC
        LIMIT 5
    ),
    album_genre_tracks AS (
        SELECT a.id as album_id, COUNT(t.id) as matching_tracks
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres)
        GROUP BY a.id
    )
    SELECT a.*
    FROM albums a
    JOIN album_genre_tracks agt ON agt.album_id = a.id
    ORDER BY agt.matching_tracks DESC, 
             (SELECT COUNT(*) FROM tracks t WHERE t.album_id = a.id) DESC
    LIMIT 10
    """, nativeQuery = true)
    List<Album> findPopularAlbumsByUserRecentGenres(@Param("userId") String userId);
}
