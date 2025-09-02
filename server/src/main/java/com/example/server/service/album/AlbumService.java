package com.example.server.service.album;

import com.example.server.model.Album;
import com.example.server.model.Author;
import com.example.server.model.Genre;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumService
{
    Album getAlbumById(Long id);
    void create(Album album);
    void delete(Long id);
    List<Album> getRecommendedAlbumsToday();
    List<Album> findPopularAlbumsByUserRecentGenres(String userId);
    Page<Album> findByAuthor(String authorId, Pageable pageable);
    Page<Album> findCollabotationsByAuthor(String authorId, Pageable pageable);
}
