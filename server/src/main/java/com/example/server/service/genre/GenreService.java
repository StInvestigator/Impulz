package com.example.server.service.genre;

import com.example.server.model.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface GenreService
{
    Genre getGenreById(Long id);
    void createGenre(Genre genre);
    void deleteGenre(Genre genre);
    Page<Genre> findTopGenres(Pageable pageable);
}
