package com.example.server.data.repository;

import com.example.server.model.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre,Long>
{

    @Query(
            value = """
        SELECT g.*, SUM(t.total_plays) AS plays_sum
        FROM genres g
        JOIN track_genres tg ON tg.genre_id = g.id
        JOIN tracks t ON tg.track_id = t.id
        GROUP BY g.id
        ORDER BY plays_sum DESC
        """,
            countQuery = """
        SELECT COUNT(DISTINCT g.id)
        FROM genres g
        JOIN track_genres tg ON tg.genre_id = g.id
        JOIN tracks t ON tg.track_id = t.id
        """,
            nativeQuery = true
    )
    Page<Genre> findTopGenres(Pageable pageable);
}
