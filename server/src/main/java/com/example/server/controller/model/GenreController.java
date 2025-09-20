package com.example.server.controller.model;

import com.example.server.data.repository.GenreRepository;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.model.Genre;
import com.example.server.service.genre.GenreService;
import jakarta.persistence.EntityNotFoundException;
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
        return genreService.getGenreSimpleDtoById(id);
    }

    @GetMapping("/TopGenres")
    public ResponseEntity<PageDto<GenreSimpleDto>> TopGenres(Pageable pageable) {
        try {
            return ResponseEntity.ok(genreService.findTopGenres(pageable));
        } catch (EntityNotFoundException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.internalServerError().build();
        }
    }

}
