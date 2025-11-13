package com.example.server.service.playlist;

import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

public interface PlaylistService {
    PlaylistDto getPlaylistDtoById(Long id);
    PlaylistSimpleDto getPlaylistSimpleDtoById(Long id);
    void createPlaylist(Playlist playlist);
    void deletePlaylistById(Long id);
    PageDto<PlaylistDto> findTopPlaylistsByFavorites(Pageable pageable);
    void addTrackToPlaylist(Long playlistId, Long trackId);
    void addTrackToPlaylist(String title, String ownerId, Long trackId);
    void changeTrackPosition(Long playlistId, Long trackId, Integer position);
    void removeTrackFromPlaylist(Long playlistId, Long trackId);
    Playlist create(String title, String uid, Boolean isPublic, MultipartFile img);
    Playlist update(Long id, String title, Boolean isPublic, MultipartFile img);
    List<PlaylistDto> getAllPlaylistsByOwnerId(String ownerId);
    Page<PlaylistDto> getPlaylistsFavorite(String ownerId, Pageable pageable);
    Page<PlaylistDto> getPublicPlaylistsByOwnerId(String ownerId, Pageable pageable);
    Page<PlaylistDto> getAllPlaylistsDtoByOwnerId(String ownerId, Pageable pageable);
    PageDto<PlaylistDto> findRecentPublicPlaylistsByGenre(Long genreId, Pageable pageable);
    List<Playlist> findPlaylistsByIds(List<Long> ids);
    void like(Long playlistId, String userId);
    void unlike(Long playlistId, String userId);
}
