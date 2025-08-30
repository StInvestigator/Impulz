package com.example.server.service.genre;

import com.example.server.data.repository.GenreRepository;
import com.example.server.model.Genre;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService
{
    private final GenreRepository genreRepository;

    public Genre getGenreById(Long id) {
        return genreRepository.getGenreById(id);
    }
}
