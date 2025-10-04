package com.example.server.service.genre;

import com.example.server.data.repository.GenreRepository;
import com.example.server.dto.Genre.GenreSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.model.Genre;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
@RequiredArgsConstructor
public class GenreServiceImpl implements GenreService {
    private final GenreRepository genreRepository;

    public GenreSimpleDto getGenreSimpleDtoById(Long id) {
        return GenreSimpleDto.fromEntity(genreRepository.findById(id).orElseThrow());
    }

    public void createGenre(Genre genre) {
        genreRepository.save(genre);
    }

    @CacheEvict(cacheNames = "genre.findTopGenres", allEntries = true)
    public void deleteGenre(Genre genre) {
        genreRepository.delete(genre);
    }

    @Cacheable(value = "genre.findTopGenres",
            key = "'p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    public PageDto<GenreSimpleDto> findTopGenres(Pageable pageable) {
        return new PageDto<>(genreRepository.findTopGenres(pageable).map(GenreSimpleDto::fromEntity));
    }

    @Override
    public List<Genre> getGenresByIds(Set<Long> ids) {
        return genreRepository.findAllById(ids);
    }

    public List<Genre> getGenresByIds(List<Long> ids) {
        return genreRepository.findAllById(ids);
    }
}
