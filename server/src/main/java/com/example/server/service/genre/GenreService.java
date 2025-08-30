package com.example.server.service.genre;

import com.example.server.model.Genre;

import java.util.List;

public interface GenreService
{
    Genre getGenreById(Long id);
    List<Genre> findTop5Genres();
}
