package com.example.server.data.repository;

import com.example.server.model.Album;
import com.example.server.model.Author;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;
import java.util.Optional;

public interface AlbumRepository extends JpaRepository<Album,Long>
{

    @Query(
            value = """
        SELECT a.* 
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_plays tp ON tp.track_id = t.id
        WHERE tp.played_at >= CURRENT_DATE - INTERVAL '30 days' AND a.release_date <= CURRENT_DATE
        GROUP BY a.id
        ORDER BY COUNT(tp.id) DESC
        """,
            countQuery = """
        SELECT COUNT(DISTINCT a.id)
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_plays tp ON tp.track_id = t.id
        WHERE tp.played_at >= CURRENT_DATE - INTERVAL '30 days' AND a.release_date <= CURRENT_DATE
        """,
            nativeQuery = true
    )
    Page<Album> findRecommendedAlbumsToday(Pageable pageable);

    @Query(
            value = """
        WITH user_recent_genres AS (
            SELECT tg.genre_id, MAX(tp.played_at) as last_played
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
            WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres) AND a.release_date <= CURRENT_DATE
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
            SELECT tg.genre_id, MAX(tp.played_at) as last_played
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
            WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres) AND a.release_date <= CURRENT_DATE
            GROUP BY a.id
        )
        SELECT COUNT(DISTINCT a.id)
        FROM albums a
        JOIN album_genre_tracks agt ON agt.album_id = a.id
        """,
            nativeQuery = true
    )
    Page<Album> findPopularAlbumsByUserRecentGenres(@Param("userId") String userId, Pageable pageable);

    Page<Album> findByAuthorsContainingAndReleaseDateLessThanEqual(Author author, OffsetDateTime date, Pageable pageable);

    @Query(
            value = "SELECT al.* FROM albums al " +
                    "JOIN album_authors aa ON al.id = aa.album_id " +
                    "WHERE aa.author_id = :authorId AND al.release_date <= CURRENT_DATE " +
                    "AND al.id IN ( " +
                    "  SELECT album_id FROM album_authors GROUP BY album_id HAVING COUNT(author_id) > 1" +
                    ")",
            countQuery = "SELECT COUNT(DISTINCT al2.id) FROM albums al2 " +
                    "JOIN album_authors aa2 ON al2.id = aa2.album_id " +
                    "WHERE aa2.author_id = :authorId AND al2.id IN (SELECT album_id FROM album_authors GROUP BY album_id HAVING COUNT(author_id) > 1)",
            nativeQuery = true
    )
    Page<Album> findAlbumsByAuthorWithMultipleAuthors(@Param("authorId") String authorId, Pageable pageable);

    Page<Album> findByAuthors_IdAndReleaseDateLessThanEqualOrderByReleaseDateDesc(String authorId, OffsetDateTime date, Pageable pageable);

    @Query(
            value = """
        SELECT a.*
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id = :genreId
          AND a.release_date <= CURRENT_DATE
        GROUP BY a.id
        ORDER BY a.release_date DESC NULLS LAST
        """,
            countQuery = """
        SELECT COUNT(DISTINCT a.id)
        FROM albums a
        JOIN tracks t ON t.album_id = a.id
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id = :genreId
          AND a.release_date <= CURRENT_DATE
        """,
            nativeQuery = true
    )
    Page<Album> findNewAlbumsByGenre(@Param("genreId") Long genreId, Pageable pageable);


    @Query("SELECT DISTINCT a FROM Album a LEFT JOIN FETCH a.authors")
    List<Album> findAllWithAuthors();

    @Query("SELECT a FROM Album a LEFT JOIN FETCH a.authors WHERE a.id = :id")
    Optional<Album> findByIdWithAuthors(@Param("id") Long id);

    @Query("SELECT DISTINCT a FROM Album a LEFT JOIN FETCH a.authors WHERE a.id IN :ids")
    List<Album> findAllWithAuthorsByIds(@Param("ids") List<Long> ids);
    @Query(
            value = """
        SELECT a.*
        FROM albums a
        JOIN user_favorite_albums ufa on ufa.album_id = a.id
        WHERE ufa.user_id = :userId
        ORDER BY ufa.added_at DESC
        """,
            countQuery = """
        SELECT COUNT(*)
        FROM albums a
        JOIN user_favorite_albums ufa on ufa.album_id = a.id
        WHERE ufa.user_id = :userId
        """,
            nativeQuery = true
    )
    Page<Album> findAllFavoriteByUserId(String userId, Pageable pageable);
}
