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

import java.util.List;
import java.util.Optional;

@Repository
public interface TrackRepository extends JpaRepository<Track, Long> {

    Track findTrackByFileUrl(String fileUrl);

    @Query(
            value = """
        SELECT t.*, COUNT(tp.id) AS play_count
        FROM tracks t
        JOIN albums a ON a.id = t.album_id
        JOIN track_plays tp
          ON t.id = tp.track_id
          AND tp.played_at >= NOW() - INTERVAL '7 days'
        WHERE a.release_date <= NOW()
        GROUP BY t.id
        ORDER BY COUNT(tp.id) DESC
        """,
            countQuery = """
        SELECT COUNT(DISTINCT t.id)
        FROM tracks t
        JOIN albums a ON a.id = t.album_id
        JOIN track_plays tp
          ON t.id = tp.track_id
          AND tp.played_at >= NOW() - INTERVAL '7 days'
        WHERE a.release_date <= NOW()
        """,
            nativeQuery = true
    )
    Page<Track> findMostPlayedTracksThisWeek(Pageable pageable);

    @Query(
            value = """
        SELECT t.*, COUNT(tp.id) AS play_count
        FROM tracks t
        JOIN albums a ON a.id = t.album_id
        LEFT JOIN track_plays tp
          ON tp.track_id = t.id
          AND tp.played_at >= CURRENT_DATE - INTERVAL '7 days'
        WHERE a.release_date <= NOW()
        GROUP BY t.id
        ORDER BY COUNT(tp.id) DESC, t.likes DESC
        """,
            countQuery = """
        SELECT COUNT(DISTINCT t.id)
        FROM tracks t
        JOIN albums a ON a.id = t.album_id
        LEFT JOIN track_plays tp
          ON tp.track_id = t.id
          AND tp.played_at >= CURRENT_DATE - INTERVAL '7 days'
        WHERE a.release_date <= NOW()
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
        JOIN albums a ON a.id = t.album_id
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres)
          AND a.release_date <= NOW()
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
        JOIN albums a ON a.id = t.album_id
        JOIN track_genres tg ON tg.track_id = t.id
        WHERE tg.genre_id IN (SELECT genre_id FROM user_recent_genres)
          AND a.release_date <= NOW()
        """,
            nativeQuery = true
    )
    Page<Track> findPopularTrackByUserRecentGenres(@Param("userId") String userId, Pageable pageable);

    @Query(
            value = """
        SELECT t.* FROM tracks t
        JOIN albums a ON a.id = t.album_id
        JOIN track_authors ta ON t.id = ta.track_id 
        WHERE ta.author_id = :authorId 
          AND a.release_date <= NOW()
          AND t.id IN ( 
            SELECT track_id FROM track_authors GROUP BY track_id HAVING COUNT(author_id) > 1
          )
        """,
            countQuery = """
        SELECT COUNT(*) FROM (
          SELECT t2.id
          FROM tracks t2
          JOIN albums a2 ON a2.id = t2.album_id
          JOIN track_authors ta2 ON t2.id = ta2.track_id
          WHERE ta2.author_id = :authorId
            AND a2.release_date <= NOW()
            AND t2.id IN (
              SELECT track_id FROM track_authors GROUP BY track_id HAVING COUNT(author_id) > 1
            )
        ) sub
        """,
            nativeQuery = true
    )
    Page<Track> findTracksByAuthorWithMultipleAuthors(@Param("authorId") String authorId, Pageable pageable);

    @Query("SELECT t FROM Track t WHERE t.album.id = :albumId AND t.album.releaseDate <= CURRENT_TIMESTAMP")
    Page<Track> findTracksByAlbum(@Param("albumId") Long albumId, Pageable pageable);

    @Query(value = """
            SELECT t.*
            FROM tracks t JOIN playlist_tracks pt ON pt.track_id = t.id
            WHERE pt.playlist_id = :playlistId
            """,
            countQuery = """
            SELECT COUNT(*) FROM(
            SELECT t.id
            FROM tracks t JOIN playlist_tracks pt ON pt.track_id = t.id
            WHERE pt.playlist_id = :playlistId) sub
            """
            , nativeQuery = true)
    Page<Track> findTracksByPlaylist(@Param("playlistId") Long playlistId, Pageable pageable);

    @Modifying
    @Query("UPDATE Track t SET t.totalPlays = t.totalPlays + 1 WHERE t.id = :trackId")
    void incrementTotalPlays(@Param("trackId") Long trackId);

    @Query("SELECT t FROM Track t JOIN t.authors au WHERE au = :author AND t.album.releaseDate <= CURRENT_TIMESTAMP ORDER BY t.totalPlays DESC")
    Page<Track> findByAuthorsOrderByTotalPlaysDesc(@Param("author") Author author, Pageable pageable);

    @Query("SELECT t FROM Track t JOIN t.genres g WHERE g.id = :genreId AND t.album.releaseDate <= CURRENT_TIMESTAMP ORDER BY t.totalPlays DESC")
    Page<Track> findByGenres_IdOrderByTotalPlaysDesc(@Param("genreId") Long genreId, Pageable pageable);

    @Query("SELECT DISTINCT t FROM Track t " +
            "LEFT JOIN FETCH t.authors " +
            "LEFT JOIN FETCH t.album " +
            "LEFT JOIN FETCH t.genres")
    List<Track> findAllWithAuthorsAndAlbum();

    @Query("SELECT t FROM Track t " +
            "LEFT JOIN FETCH t.authors " +
            "LEFT JOIN FETCH t.album " +
            "LEFT JOIN FETCH t.genres " +
            "WHERE t.id = :id")
    Optional<Track> findByIdWithAuthorsAndAlbum(@Param("id") Long id);

    @Query("SELECT DISTINCT t FROM Track t " +
            "LEFT JOIN FETCH t.authors " +
            "LEFT JOIN FETCH t.album " +
            "LEFT JOIN FETCH t.genres " +
            "WHERE t.id IN :ids")
    List<Track> findAllWithAuthorsAndAlbumByIds(@Param("ids") List<Long> ids);

    @Query("SELECT t FROM Track t " +
            "JOIN UserFavoriteTrack uft ON uft.track.id = t.id " +
            "WHERE uft.user.id = :userId " +
            "AND t.album.releaseDate <= CURRENT_TIMESTAMP " +
            "ORDER BY uft.addedAt DESC")
    Page<Track> findLikedTracksByUserId(@Param("userId") String userId, Pageable pageable);
}