package com.example.server.data.repository;

import com.example.server.model.Author;
import com.example.server.model.User;
import com.example.server.model.id.AuthorFollower;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,String>
{

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
}
