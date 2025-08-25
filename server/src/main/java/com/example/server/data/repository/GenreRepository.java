package com.example.server.data.repository;

import com.example.server.model.Genre;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GenreRepository extends JpaRepository<Genre,Long>
{
    Genre getGenreById(Long id);
}
