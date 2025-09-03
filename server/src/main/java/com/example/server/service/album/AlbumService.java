package com.example.server.service.album;

import com.example.server.model.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface AlbumService
{
    Album getAlbumById(Long id);
    void create(Album album);
    void delete(Long id);
    Page<Album> getRecommendedAlbumsToday(Pageable pageable);
    Page<Album> findPopularAlbumsByUserRecentGenres(String userId, Pageable pageable);
    Page<Album> findByAuthor(String authorId, Pageable pageable);
    Page<Album> findCollaborationsByAuthor(String authorId, Pageable pageable);
    Page<Album> findByAuthorOrderByReleaseDateDesc(String authorId, Pageable pageable);
    Page<Album> findNewAlbumsByGenre(Long genreId, Pageable pageable);
}
