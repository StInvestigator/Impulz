package com.example.server.service.album;

import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.model.Album;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AlbumService
{
    Album getAlbumById(Long id);
    void create(Album album);
    void delete(Long id);
    Page<AlbumSimpleDto> getRecommendedAlbumsToday(Pageable pageable);
    Page<AlbumSimpleDto> findPopularAlbumsByUserRecentGenres(String userId, Pageable pageable);
    Page<AlbumSimpleDto> findByAuthor(String authorId, Pageable pageable);
    Page<AlbumSimpleDto> findCollaborationsByAuthor(String authorId, Pageable pageable);
    Page<AlbumSimpleDto> findByAuthorOrderByReleaseDateDesc(String authorId, Pageable pageable);
    Page<AlbumSimpleDto> findNewAlbumsByGenre(Long genreId, Pageable pageable);
}
