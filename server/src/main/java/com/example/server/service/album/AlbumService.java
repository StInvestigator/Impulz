package com.example.server.service.album;

import com.example.server.model.Album;

import java.util.List;

public interface AlbumService
{
    Album getAlbumById(Long id);
    void create(Album album);
    void delete(Album album);
    List<Album> getRecommendedAlbumsToday();
}
