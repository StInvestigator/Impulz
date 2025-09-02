package com.example.server.service.playlist;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.data.repository.PlaylistTrackRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.key.PlaylistTrackKey;
import com.example.server.service.track.TrackService;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
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

    public Playlist getPlaylistsById(Long id){
        return playlistRepository.findById(id).orElseThrow();
    }

    public void createPlaylist(Playlist playlist){
        playlistRepository.save(playlist);
    }

    public void deletePlaylist(Playlist playlist){
        playlistRepository.delete(playlist);
    }

    public Page<Playlist> findTopPlaylistsByFavorites(Pageable pageable){
        return playlistRepository.findTopPlaylistsByFavorites(pageable);
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public void addTrackToPlaylist(Long playlistId, Long trackId, int position) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));
        Track track = trackService.getTrackById(trackId);

        if(track == null){
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
