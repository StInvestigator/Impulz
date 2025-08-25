package com.example.server.controller.model;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.model.Album;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/album")
@RequiredArgsConstructor
public class AlbumController
{
    private final AlbumRepository albumRepository;

    @GetMapping("/simpleDto/{id}")
    public AlbumSimpleDto getAlbumSimpleDto(@PathVariable Long id){
        Album album = albumRepository.getAlbumById(id);
        return AlbumSimpleDto.fromEntity(album);
    }

    @GetMapping("/Dto/{id}")
    public AlbumDto getAlbumDto(@PathVariable Long id){
        Album album = albumRepository.getAlbumById(id);
        return AlbumDto.fromEntity(album);
    }
}