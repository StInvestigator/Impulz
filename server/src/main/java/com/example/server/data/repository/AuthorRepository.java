package com.example.server.data.repository;

import com.example.server.model.Author;
import com.example.server.model.User;
import com.example.server.model.id.AuthorFollower;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface AuthorRepository extends JpaRepository<Author, String> {

    @Query(
            value = """
                    SELECT a.*, COUNT(tp.id) AS play_count
                    FROM authors a
                    JOIN track_authors ta ON ta.author_id = a.user_id
                    JOIN track_plays tp ON tp.track_id = ta.track_id
                      AND tp.played_at >= CURRENT_DATE - INTERVAL '30 days'
                    GROUP BY a.user_id
                    ORDER BY COUNT(tp.id) DESC
                    """,
            countQuery = """
                    SELECT COUNT(DISTINCT a.user_id)
                    FROM authors a
                    JOIN track_authors ta ON ta.author_id = a.user_id
                    JOIN track_plays tp ON tp.track_id = ta.track_id
                      AND tp.played_at >= CURRENT_DATE - INTERVAL '30 days'
                    """,
            nativeQuery = true
    )
    Page<Author> findTopAuthorsOfMonth(Pageable pageable);

    @Query(
            value = """
                    SELECT a.*, COUNT(DISTINCT tg2.genre_id) AS common_genres
                    FROM authors a
                    JOIN track_authors ta2 ON ta2.author_id = a.user_id
                    JOIN tracks t2 ON t2.id = ta2.track_id
                    JOIN track_genres tg2 ON tg2.track_id = t2.id
                    WHERE a.user_id <> :authorId
                      AND tg2.genre_id IN (
                        SELECT DISTINCT tg.genre_id
                        FROM track_authors ta
                        JOIN tracks t ON t.id = ta.track_id
                        JOIN track_genres tg ON tg.track_id = t.id
                        WHERE ta.author_id = :authorId
                      )
                    GROUP BY a.user_id
                    ORDER BY common_genres DESC
                    """,
            countQuery = """
                    SELECT COUNT(DISTINCT a.user_id)
                    FROM authors a
                    JOIN track_authors ta2 ON ta2.author_id = a.user_id
                    JOIN tracks t2 ON t2.id = ta2.track_id
                    JOIN track_genres tg2 ON tg2.track_id = t2.id
                    WHERE a.user_id <> :authorId
                      AND tg2.genre_id IN (
                        SELECT DISTINCT tg.genre_id
                        FROM track_authors ta
                        JOIN tracks t ON t.id = ta.track_id
                        JOIN track_genres tg ON tg.track_id = t.id
                        WHERE ta.author_id = :authorId
                      )
                    """,
            nativeQuery = true
    )
    Page<Author> findSimilarBySharedGenres(@Param("authorId") String authorId, Pageable pageable);

    @Query(
            value = """
                    SELECT a.*
                    FROM authors a
                    JOIN track_authors ta    ON ta.author_id = a.user_id
                    JOIN tracks t            ON t.id = ta.track_id
                    JOIN track_genres tg     ON tg.track_id = t.id
                      AND tg.genre_id = :genreId
                    LEFT JOIN track_plays tp ON tp.track_id = t.id
                    GROUP BY a.user_id
                    ORDER BY COUNT(tp.id) DESC NULLS LAST
                    """,
            countQuery = """
                    SELECT COUNT(DISTINCT a.user_id)
                    FROM authors a
                    JOIN track_authors ta    ON ta.author_id = a.user_id
                    JOIN tracks t            ON t.id = ta.track_id
                    JOIN track_genres tg     ON tg.track_id = t.id
                      AND tg.genre_id = :genreId
                    """,
            nativeQuery = true
    )
    Page<Author> findTopAuthorsByGenre(@Param("genreId") Long genreId, Pageable pageable);

    @Query(
            value = """
                    SELECT COUNT(*) AS plays_count
                    FROM track_plays p
                    WHERE p.played_at >= NOW() - INTERVAL '30 days'
                      AND EXISTS (
                        SELECT 1 FROM track_authors ta
                        WHERE ta.track_id = p.track_id
                          AND ta.author_id = :authorId
                      );
                    """,
            nativeQuery = true
    )
    Long countAuthorPlaysByMonth(@Param("authorId") String authorId);

    List<Author> findAllByUserUsernameContainingIgnoreCase(String name);

    @Query("SELECT DISTINCT a FROM Author a LEFT JOIN FETCH a.user")
    List<Author> findAllWithUser();

    @Query("SELECT a FROM Author a LEFT JOIN FETCH a.user WHERE a.id = :id")
    Optional<Author> findByIdWithUser(@Param("id") String id);

    @Query("SELECT DISTINCT a FROM Author a LEFT JOIN FETCH a.user WHERE a.id IN :ids")
    List<Author> findAllWithUserByIds(@Param("ids") List<String> ids);
    Page<Author> findAllByFollowersFollowerIdOrderByFollowersFollowedAtDesc(String userId, Pageable pageable);
}
