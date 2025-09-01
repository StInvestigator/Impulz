package com.example.server.service.album;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.model.Album;
import lombok.RequiredArgsConstructor;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AlbumServiceImpl implements AlbumService
{
    private final AlbumRepository albumRepository;

    public Album getAlbumById(Long id){
        return albumRepository.getAlbumById(id);
    }

    public void create(Album album){
        albumRepository.save(album);
    }

    public void delete(Album album){
        albumRepository.delete(album);
    }

    public List<Album> getRecommendedAlbumsToday() {
        return albumRepository.findRecommendedAlbumsToday();
    }

    public List<Album> findPopularAlbumsByUserRecentGenres(String userId){
        return albumRepository.findPopularAlbumsByUserRecentGenres(userId);
    }
}
