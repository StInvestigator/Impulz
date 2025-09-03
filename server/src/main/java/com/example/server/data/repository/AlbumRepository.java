package com.example.server.data.repository;

import com.example.server.model.Album;
import com.example.server.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumRepository extends JpaRepository<Album,Long>
{

    @Query(
            value = """
        SELECT a.* 
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_plays tp ON tp.track_id = t.id
        WHERE tp.played_at >= CURRENT_DATE - INTERVAL '30 days'
        GROUP BY a.id
        ORDER BY COUNT(tp.id) DESC
        """,
            countQuery = """
        SELECT COUNT(DISTINCT a.id)
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_plays tp ON tp.track_id = t.id
        WHERE tp.played_at >= CURRENT_DATE - INTERVAL '30 days'
        """,
            nativeQuery = true
    )
    Page<Album> findRecommendedAlbumsToday(Pageable pageable);

    @Query(
            value = """
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
        """,
            countQuery = """
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
        SELECT COUNT(DISTINCT a.id)
        FROM albums a
        JOIN album_genre_tracks agt ON agt.album_id = a.id
        """,
            nativeQuery = true
    )
    Page<Album> findPopularAlbumsByUserRecentGenres(@Param("userId") String userId, Pageable pageable);

    Page<Album> findByAuthors(Author author, Pageable pageable);

    @Query(
            value = "SELECT al.* FROM albums al " +
                    "JOIN album_authors aa ON al.id = aa.album_id " +
                    "WHERE aa.author_id = :authorId " +
                    "AND al.id IN ( " +
                    "  SELECT album_id FROM album_authors GROUP BY album_id HAVING COUNT(author_id) > 1" +
                    ")",
            countQuery = "SELECT COUNT(*) FROM ( " +
                    "  SELECT album_id FROM album_authors GROUP BY album_id HAVING COUNT(author_id) > 1" +
                    ") t JOIN albums al2 ON al2.id = t.album_id JOIN album_authors aa2 ON al2.id = aa2.album_id WHERE aa2.author_id = :authorId",
            nativeQuery = true
    )
    Page<Album> findAlbumsByAuthorWithMultipleAuthors(@Param("authorId") String authorId, Pageable pageable);

    Page<Album> findByAuthors_IdOrderByReleaseDateDesc(String authorId, Pageable pageable);

    @Query(
            value = """
        SELECT a.*
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_genres tg ON tg.track_id = t.id AND tg.genre_id = :genreId
        GROUP BY a.id
        ORDER BY a.release_date DESC NULLS LAST
        """,
            countQuery = """
        SELECT COUNT(DISTINCT a.id)
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_genres tg ON tg.track_id = t.id AND tg.genre_id = :genreId
        """,
            nativeQuery = true
    )
    Page<Album> findNewAlbumsByGenre(@Param("genreId") Long genreId, Pageable pageable);
}
