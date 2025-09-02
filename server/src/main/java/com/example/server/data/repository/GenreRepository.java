package com.example.server.data.repository;

import com.example.server.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GenreRepository extends JpaRepository<Genre,Long>
{

    @Query(value = """
    SELECT g.* FROM genres g
    JOIN track_genres tg ON tg.genre_id = g.id
    JOIN tracks t ON tg.track_id = t.id
    GROUP BY g.id
    ORDER BY SUM(t.total_plays) DESC
    LIMIT 5
    """, nativeQuery = true)
    List<Genre> findTop5Genres();
}
