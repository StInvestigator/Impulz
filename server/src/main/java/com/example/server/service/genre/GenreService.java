package com.example.server.service.genre;

import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.model.Genre;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.Set;

public interface GenreService
{
    GenreSimpleDto getGenreSimpleDtoById(Long id);
    void createGenre(Genre genre);
    void deleteGenre(Genre genre);
    PageDto<GenreSimpleDto> findTopGenres(Pageable pageable);
    List<Genre> getGenresByIds(Set<Long> ids);
    List<GenreSimpleDto> getAllGenres();
    List<Genre> getGenresByIds(List<Long> ids);
}
