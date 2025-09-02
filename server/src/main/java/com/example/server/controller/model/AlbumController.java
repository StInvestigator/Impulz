package com.example.server.controller.model;

import com.example.server.data.repository.AlbumRepository;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.User.UserSimpleDto;
import com.example.server.model.Album;
import com.example.server.model.User;
import com.example.server.service.album.AlbumService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/albums")
@RequiredArgsConstructor
public class AlbumController {
    private final AlbumService albumService;

    @GetMapping("/simpleDto/{id}")
    public AlbumSimpleDto getAlbumSimpleDto(@PathVariable Long id) {
        Album album = albumService.getAlbumById(id);
        return AlbumSimpleDto.fromEntity(album);
    }

    @GetMapping("/Dto/{id}")
    public AlbumDto getAlbumDto(@PathVariable Long id) {
        Album album = albumService.getAlbumById(id);
        return AlbumDto.fromEntity(album);
    }

    @GetMapping("/ByAuthor/{id}")
    public ResponseEntity<Page<AlbumSimpleDto>> getAlbumsByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            Page<Album> albums = albumService.findByAuthor(id, pageable);
            Page<AlbumSimpleDto> dtoPage = albums.map(AlbumSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/ByAuthor/Collaborations/{id}")
    public ResponseEntity<Page<AlbumSimpleDto>> getCollaborationsByAuthor(@PathVariable String id, Pageable pageable) {
        try {
            Page<Album> albums = albumService.findCollabotationsByAuthor(id, pageable);
            Page<AlbumSimpleDto> dtoPage = albums.map(AlbumSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/Recommendations/Today")
    public ResponseEntity<Page<AlbumSimpleDto>> getTodayRecommended(Pageable pageable) {
        try {
            Page<Album> albums = albumService.getRecommendedAlbumsToday(pageable);
            Page<AlbumSimpleDto> dtoPage = albums.map(AlbumSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        }
        catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/Recommendations/PersonalByGenres/{userId}")
    public ResponseEntity<Page<AlbumSimpleDto>> getPersonalRecommended(@PathVariable String userId, Pageable pageable) {
        try {
            Page<Album> albums = albumService.findPopularAlbumsByUserRecentGenres(userId, pageable);
            Page<AlbumSimpleDto> dtoPage = albums.map(AlbumSimpleDto::fromEntity);
            return ResponseEntity.ok(dtoPage);
        }
        catch (Exception e){
            return ResponseEntity.notFound().build();
        }
    }
}