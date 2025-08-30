package com.example.server.service.album;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.model.Album;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

}
