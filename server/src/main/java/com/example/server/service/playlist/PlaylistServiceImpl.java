package com.example.server.service.playlist;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.data.repository.PlaylistTrackRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.key.PlaylistTrackKey;
import jakarta.persistence.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PlaylistServiceImpl implements PlaylistService {
    private final PlaylistRepository playlistRepository;
    private final TrackRepository trackRepository;
    private final PlaylistTrackRepository playlistTrackRepository;

    public Playlist getPlaylistsById(Long id){
        return playlistRepository.getPlaylistsById(id);
    }

    public List<Playlist> findTop20PlaylistsByFavorites(){
        return playlistRepository.findTop20PlaylistsByFavorites();
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepository.findAll();
    }

    public void addTrackToPlaylist(Long playlistId, Long trackId, int position) {
        Playlist playlist = playlistRepository.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));
        Track track = trackRepository.findById(trackId)
                .orElseThrow(() -> new EntityNotFoundException("Track not found"));

        PlaylistTrackKey key = new PlaylistTrackKey(playlistId, trackId);
        PlaylistTrack entry = new PlaylistTrack();
        entry.setId(key);
        entry.setPlaylist(playlist);
        entry.setTrack(track);
        entry.setPosition(position);

        playlistTrackRepository.save(entry);
    }
}
