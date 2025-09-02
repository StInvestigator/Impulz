package com.example.server.data.repository;

import com.example.server.model.Author;
import com.example.server.model.Track;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {

    Track findTrackByFileUrl(String fileUrl);

    @Query(
            value = """
        SELECT t.*, COUNT(tp.id) AS play_count
        FROM tracks t
        JOIN track_plays tp
          ON t.id = tp.track_id
          AND tp.played_at >= NOW() - INTERVAL '7 days'
        GROUP BY t.id
        ORDER BY COUNT(tp.id) DESC
        """,
            countQuery = """
        SELECT COUNT(DISTINCT t.id)
        FROM tracks t
        JOIN track_plays tp
          ON t.id = tp.track_id
          AND tp.played_at >= NOW() - INTERVAL '7 days'
        """,
            nativeQuery = true
    )
    Page<Track> findMostPlayedTracksThisWeek(Pageable pageable);


    @Query(
            value = """
        SELECT t.*, COUNT(tp.id) AS play_count
        FROM tracks t
        LEFT JOIN track_plays tp
          ON tp.track_id = t.id
          AND tp.played_at >= CURRENT_DATE - INTERVAL '7 days'
        GROUP BY t.id
        ORDER BY COUNT(tp.id) DESC, t.likes DESC
        """,
            countQuery = """
        SELECT COUNT(DISTINCT t.id)
        FROM tracks t
        JOIN track_plays tp
          ON tp.track_id = t.id
          AND tp.played_at >= CURRENT_DATE - INTERVAL '7 days'
        """,
            nativeQuery = true
    )
    Page<Track> findRecommendedTracksToday(Pageable pageable);

    @Query(
            value = """
        WITH user_recent_genres AS (
          SELECT tg.genre_id
          FROM track_plays tp
          JOIN track_genres tg ON tg.track_id = tp.track_id
          WHERE tp.user_id = :userId
          GROUP BY tg.genre_id
          ORDER BY MAX(tp.played_at) DESC
          LIMIT 5
        )
        SELECT t.*, COUNT(tg.genre_id) AS matching_genres_count
        FROM tracks t
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres)
        GROUP BY t.id
        ORDER BY COUNT(tg.genre_id) DESC, t.total_plays DESC, t.likes DESC
        """,
            countQuery = """
        WITH user_recent_genres AS (
          SELECT tg.genre_id
          FROM track_plays tp
          JOIN track_genres tg ON tg.track_id = tp.track_id
          WHERE tp.user_id = :userId
          GROUP BY tg.genre_id
          ORDER BY MAX(tp.played_at) DESC
          LIMIT 5
        )
        SELECT COUNT(DISTINCT t.id)
        FROM tracks t
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres)
        """,
            nativeQuery = true
    )
    Page<Track> findPopularTrackByUserRecentGenres(@Param("userId") String userId, Pageable pageable);

    @Modifying
    @Query("UPDATE Track t SET t.totalPlays = t.totalPlays + 1 WHERE t.id = :trackId")
    void incrementTotalPlays(@Param("trackId") Long trackId);


    Page<Track> findByAuthorsOrderByTotalPlaysDesc(Author author, Pageable pageable);
}
