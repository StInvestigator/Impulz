package com.example.server.service.album;

import com.example.server.dto.Album.AlbumCreationDto;
import com.example.server.dto.Album.AlbumDto;
import com.example.server.dto.Album.AlbumSimpleDto;
import com.example.server.dto.Page.PageDto;
import com.example.server.model.Album;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface AlbumService
{
    Album getById(Long id);
    AlbumDto getAlbumDtoById(Long id);
    AlbumSimpleDto getAlbumSimpleDtoById(Long id);
    void create(Album album);
    void delete(Long id);
    PageDto<AlbumSimpleDto> getRecommendedAlbumsToday(Pageable pageable);
    PageDto<AlbumSimpleDto> findPopularAlbumsByUserRecentGenres(String userId, Pageable pageable);
    PageDto<AlbumSimpleDto> findByAuthor(String authorId, Pageable pageable);
    PageDto<AlbumSimpleDto> findCollaborationsByAuthor(String authorId, Pageable pageable);
    PageDto<AlbumSimpleDto> findByAuthorOrderByReleaseDateDesc(String authorId, Pageable pageable);
    PageDto<AlbumSimpleDto> findNewAlbumsByGenre(Long genreId, Pageable pageable);
    Album upload(AlbumCreationDto metadata, MultipartFile cover, List<MultipartFile> trackFiles, List<MultipartFile> trackCovers);
    Page<AlbumSimpleDto> findFavoriteByUserId(String userId, Pageable pageable);
    List<Album> findAlbumsByIds(List<Long> ids);
    void like(Long albumId,String userId);
}
