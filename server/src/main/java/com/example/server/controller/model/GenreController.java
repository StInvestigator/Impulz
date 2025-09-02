package com.example.server.controller.model;

import com.example.server.data.repository.GenreRepository;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.model.Genre;
import com.example.server.service.genre.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/genres")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @GetMapping("/simpleDto/{id}")
    public GenreSimpleDto getGenreSimpleDto(@PathVariable Long id) {
        Genre genre = genreService.getGenreById(id);
        return GenreSimpleDto.fromEntity(genre);
    }

    @GetMapping("/TopGenres")
    public ResponseEntity<Page<GenreSimpleDto>> TopGenres(Pageable pageable) {
        try {
            Page<Genre> genres = genreService.findTopGenres(pageable);
            return ResponseEntity.ok(genres.map(GenreSimpleDto::fromEntity));
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }
}
