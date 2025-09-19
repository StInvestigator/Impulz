package com.example.server.service.album;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.data.repository.AuthorRepository;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.Author;
import com.example.server.service.author.AuthorService;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
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

    @Cacheable(value = "album.byId", key = "#id")
    public Album getAlbumById(Long id){
        return albumRepository.findById(id).orElseThrow();
    }

    public void create(Album album){
        albumRepository.save(album);
    }

    @CacheEvict(value = "album.byId", key = "#id")
    public void delete(Long id){
        albumRepository.deleteById(id);
    }

    @Cacheable(value = "album.recommendedToday")
    public Page<AlbumSimpleDto> getRecommendedAlbumsToday(Pageable pageable) {
        return albumRepository.findRecommendedAlbumsToday(pageable).map(AlbumSimpleDto::fromEntity);
    }

    public Page<AlbumSimpleDto> findPopularAlbumsByUserRecentGenres(String userId, Pageable pageable){
        return albumRepository.findPopularAlbumsByUserRecentGenres(userId, pageable).map(AlbumSimpleDto::fromEntity);
    }

    @Cacheable(value = "album.byAuthor",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")

    @Override
    public Page<AlbumSimpleDto> findByAuthor(String authorId, Pageable pageable) {
        return albumRepository.findByAuthorsContainingAndReleaseDateLessThanEqual(authorService.getAuthorById(authorId), OffsetDateTime.now(), pageable).map(AlbumSimpleDto::fromEntity);
    }

    @Cacheable(value = "album.collaborationsByAuthor",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public Page<AlbumSimpleDto> findCollaborationsByAuthor(String authorId, Pageable pageable) {
        return albumRepository.findAlbumsByAuthorWithMultipleAuthors(authorId, pageable).map(AlbumSimpleDto::fromEntity);
    }

    @Cacheable(value = "album.byAuthorReleaseDateDesc",
            key = "#authorId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public Page<AlbumSimpleDto> findByAuthorOrderByReleaseDateDesc(String authorId, Pageable pageable) {
        return albumRepository.findByAuthors_IdAndReleaseDateLessThanEqualOrderByReleaseDateDesc(authorId, OffsetDateTime.now(), pageable).map(AlbumSimpleDto::fromEntity);
    }

    @Cacheable(value = "album.byGenreReleaseDateDesc",
            key = "#genreId + '::p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    @Override
    public Page<AlbumSimpleDto> findNewAlbumsByGenre(Long genreId, Pageable pageable) {
        return albumRepository.findNewAlbumsByGenre(genreId,pageable).map(AlbumSimpleDto::fromEntity);
    }
}
