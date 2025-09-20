package com.example.server.service.album;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.model.Album;
import com.example.server.model.Author;
import com.example.server.service.author.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.cache.annotation.Caching;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService
{
    private final AlbumRepository albumRepository;
    private final AuthorService authorService;

    public AlbumDto getAlbumDtoById(Long id){
        return AlbumDto.fromEntity(albumRepository.findById(id).orElseThrow());
    }

    public AlbumSimpleDto getAlbumSimpleDtoById(Long id){
        return AlbumSimpleDto.fromEntity(albumRepository.findById(id).orElseThrow());
    }

    public void create(Album album){
        albumRepository.save(album);
    }

    @Caching(evict = {
            @CacheEvict(cacheNames = {"album.recommendedToday","album.byAuthor",
                    "album.collaborationsByAuthor", "album.collaborationsByAuthor",
                    "album.byAuthorReleaseDateDesc", "album.byGenreReleaseDateDesc"}, allEntries = true)
    })
    public void delete(Long id){
        albumRepository.deleteById(id);
    }

    @Cacheable(value = "album.recommendedToday")
    public PageDto<AlbumSimpleDto> getRecommendedAlbumsToday(Pageable pageable) {
        return new PageDto<>(albumRepository.findRecommendedAlbumsToday(pageable).map(AlbumSimpleDto::fromEntity));
    }

    public PageDto<AlbumSimpleDto> findPopularAlbumsByUserRecentGenres(String userId, Pageable pageable){
        return new PageDto<>(albumRepository.findPopularAlbumsByUserRecentGenres(userId, pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.byAuthor",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findByAuthor(String authorId, Pageable pageable) {
        return new PageDto<>(albumRepository.findByAuthorsContainingAndReleaseDateLessThanEqual(authorService.getAuthorById(authorId), OffsetDateTime.now(), pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.collaborationsByAuthor",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findCollaborationsByAuthor(String authorId, Pageable pageable) {
        return new PageDto<>(albumRepository.findAlbumsByAuthorWithMultipleAuthors(authorId, pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.byAuthorReleaseDateDesc",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findByAuthorOrderByReleaseDateDesc(String authorId, Pageable pageable) {
        return new PageDto<>(albumRepository.findByAuthors_IdAndReleaseDateLessThanEqualOrderByReleaseDateDesc(authorId, OffsetDateTime.now(), pageable).map(AlbumSimpleDto::fromEntity));
    }

    @Cacheable(value = "album.byGenreReleaseDateDesc",
            key = "#genreId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public PageDto<AlbumSimpleDto> findNewAlbumsByGenre(Long genreId, Pageable pageable) {
        return new PageDto<>(albumRepository.findNewAlbumsByGenre(genreId,pageable).map(AlbumSimpleDto::fromEntity));
    }
}
