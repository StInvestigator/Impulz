package com.example.server.controller.model;

import com.example.server.data.repository.GenreRepository;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.model.Genre;
import com.example.server.service.genre.GenreService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/genre")
@RequiredArgsConstructor
public class GenreController {
    private final GenreService genreService;

    @GetMapping("/simpleDto/{id}")
    public GenreSimpleDto getGenreSimpleDto(@PathVariable Long id){
        Genre genre = genreService.getGenreById(id);
        return GenreSimpleDto.fromEntity(genre);
    }

    @GetMapping("/simpleDto/findTop5Genres")
    public List<GenreSimpleDto> findTop5Genres(){
        List<Genre> genres = genreService.findTop5Genres();
        return genres.stream()
                .map(GenreSimpleDto::fromEntity)
                .toList();
    }
}
