package com.example.server.service.playlist;

import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.Playlist;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

import java.util.List;

public interface PlaylistService {
    PlaylistDto getPlaylistDtoById(Long id);
    PlaylistSimpleDto getPlaylistSimpleDtoById(Long id);
    void createPlaylist(Playlist playlist);
    void deletePlaylist(Playlist playlist);
    PageDto<PlaylistSimpleDto> findTopPlaylistsByFavorites(Pageable pageable);
    void addTrackToPlaylist(Long playlistId, Long trackId, int position);
    Playlist create(String title, String uid, Boolean isPublic, MultipartFile img);
}
