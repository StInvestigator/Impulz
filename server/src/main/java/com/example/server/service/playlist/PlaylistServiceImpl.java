package com.example.server.service.playlist;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.data.repository.PlaylistTrackRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.dto.Page.PageDto;
import com.example.server.dto.Playlist.PlaylistDto;
import com.example.server.dto.Playlist.PlaylistSimpleDto;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.key.PlaylistTrackKey;
import com.example.server.service.track.TrackService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final PlaylistTrackRepository playlistTrackRepository;
    private final TrackService trackService;

    public PlaylistDto getPlaylistDtoById(Long id) {
        return PlaylistDto.fromEntity(playlistRepository.findById(id).orElseThrow());
    }

    public PlaylistSimpleDto getPlaylistSimpleDtoById(Long id) {
        return PlaylistSimpleDto.fromEntity(playlistRepository.findById(id).orElseThrow());
    }

    public void createPlaylist(Playlist playlist) {
        playlistRepository.save(playlist);
    }

    @CacheEvict(cacheNames = "playlist.findTopPlaylistsByFavorites", allEntries = true)
    public void deletePlaylist(Playlist playlist) {
        playlistRepository.delete(playlist);
    }

    @Cacheable(value = "playlist.findTopPlaylistsByFavorites",
            key = "'p=' + #pageable.pageNumber + ',s=' + #pageable.pageSize + ',sort=' + (#pageable.sort != null ? #pageable.sort.toString() : '')")
    public PageDto<PlaylistSimpleDto> findTopPlaylistsByFavorites(Pageable pageable) {
        return new PageDto<>(playlistRepository.
                findTopPlaylistsByFavorites(pageable).
                map(PlaylistSimpleDto::fromEntity));
    }

    public void addTrackToPlaylist(Long playlistId, Long trackId, int position) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));
        Track track = trackService.getTrackById(trackId);

        if (track == null) {
            throw new EntityNotFoundException("Track not found");
        }

        PlaylistTrackKey key = new PlaylistTrackKey(playlistId, trackId);
        PlaylistTrack entry = new PlaylistTrack();
        entry.setId(key);
        entry.setPlaylist(playlist);
        entry.setTrack(track);
        entry.setPosition(position);

        playlistTrackRepository.save(entry);
    }
}
