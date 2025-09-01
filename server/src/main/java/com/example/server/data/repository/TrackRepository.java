package com.example.server.data.repository;

import com.example.server.model.Track;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {

    @Query("""
        SELECT t FROM Track t
        LEFT JOIN FETCH t.album
        LEFT JOIN FETCH t.authors a
        LEFT JOIN FETCH a.user
        LEFT JOIN FETCH t.genres
        LEFT JOIN FETCH t.subtitles
        WHERE t.id = :id
    """)
    Track getTrackById(@Param("id") Long id);

    Track findTrackByFileUrl(String fileUrl);

    @Query(value = """
        SELECT t.*, COUNT(tp.id) as play_count
        FROM tracks t
        JOIN track_plays tp ON t.id = tp.track_id
        WHERE tp.played_at >= NOW() - INTERVAL '7 days'
        GROUP BY t.id
        ORDER BY COUNT(tp.id) DESC
        LIMIT 20
        """, nativeQuery = true)
    List<Track> findTop20MostPlayedTracksThisWeek();

    @Query(value = """
    SELECT t.* FROM tracks t
    LEFT JOIN track_plays tp ON tp.track_id = t.id
    WHERE tp.played_at >= CURRENT_DATE - INTERVAL '7 days'
    GROUP BY t.id
    ORDER BY COUNT(tp.id) DESC, t.likes DESC
    LIMIT 15
    """, nativeQuery = true)
    List<Track> findRecommendedTracksToday();

    @Query(value = """
    WITH user_recent_genres AS (
        SELECT tg.genre_id, MAX(tp.played_at) as last_played
        FROM track_plays tp
        JOIN track_genres tg ON tg.track_id = tp.track_id
        WHERE tp.user_id = :userId
        GROUP BY tg.genre_id
        ORDER BY last_played DESC
        LIMIT 5
    )
    SELECT t.*
    FROM tracks t
    JOIN track_genres tg ON tg.track_id = t.id
    WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres)
    GROUP BY t.id
    ORDER BY COUNT(tg.genre_id) DESC,
             t.total_plays DESC,
             t.likes DESC
    LIMIT 15
    """, nativeQuery = true)
    List<Track> findPopularTrackByUserRecentGenres(@Param("userId") String userId);

    @Modifying
    @Query("UPDATE Track t SET t.totalPlays = t.totalPlays + 1 WHERE t.id = :trackId")
    void incrementTotalPlays(@Param("trackId") Long trackId);
}
