package com.example.server.service.album;

import com.example.server.model.Album;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AlbumService
{
    Album getAlbumById(Long id);
    void create(Album album);
    void delete(Album album);
    List<Album> getRecommendedAlbumsToday();
    List<Album> findPopularAlbumsByUserRecentGenres(String userId);
}
