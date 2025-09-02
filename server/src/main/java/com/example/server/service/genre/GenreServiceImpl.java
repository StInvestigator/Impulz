package com.example.server.service.genre;

import com.example.server.data.repository.GenreRepository;
import com.example.server.model.Genre;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService
{
    private final GenreRepository genreRepository;

    public Genre getGenreById(Long id) {
        return genreRepository.findById(id).orElseThrow();
    }

    public void createGenre(Genre genre){
        genreRepository.save(genre);
    }

    public void deleteGenre(Genre genre){
        genreRepository.delete(genre);
    }

    public Page<Genre> findTopGenres(Pageable pageable){
        return genreRepository.findTopGenres(pageable);
    }
}
