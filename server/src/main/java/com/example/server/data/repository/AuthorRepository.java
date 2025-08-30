package com.example.server.data.repository;

import com.example.server.model.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AuthorRepository extends JpaRepository<Author,String>
{
    Author getAuthorById(String id);

    @Query(value = """
    SELECT a.* FROM authors a
    JOIN author_monthly_plays amp ON amp.author_id = a.user_id
    WHERE amp.month = date_trunc('month', now())
    ORDER BY amp.plays_count DESC
    LIMIT 20
    """, nativeQuery = true)
    List<Author> findTop20AuthorsOfMonth();
}
