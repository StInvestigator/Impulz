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
    PageDto<PlaylistSimpleDto> findTopPlaylistsByFavorites(Pageable pageable);
    void addTrackToPlaylist(Long playlistId, Long trackId);
    void addTrackToPlaylist(String title, String ownerId, Long trackId);
    void changeTrackPosition(Long playlistId, Long trackId, Integer position);
    void removeTrackFromPlaylist(Long playlistId, Long trackId);
    Playlist create(String title, String uid, Boolean isPublic, MultipartFile img);
    List<PlaylistSimpleDto> getAllPlaylistsByOwnerId(String ownerId);
    Page<PlaylistSimpleDto> getPlaylistsFavorite(String ownerId, Pageable pageable);
    Page<PlaylistSimpleDto> getPublicPlaylistsByOwnerId(String ownerId, Pageable pageable);
    PageDto<PlaylistSimpleDto> findRecentPublicPlaylistsByGenre(Long genreId, Pageable pageable);
    List<Playlist> findPlaylistsByIds(List<Long> ids);
}
