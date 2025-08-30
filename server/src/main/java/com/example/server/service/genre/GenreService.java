package com.example.server.service.genre;

import com.example.server.model.Genre;

import java.util.List;

public interface GenreService
{
    Genre getGenreById(Long id);
    void createGenre(Genre genre);
    void deleteGenre(Genre genre);
    List<Genre> findTop5Genres();
}
