package com.example.server.service.playlist;

import com.example.server.data.repository.PlaylistRepository;
import com.example.server.data.repository.PlaylistTrackRepository;
import com.example.server.data.repository.TrackRepository;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.key.PlaylistTrackKey;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlaylistService implements IPlaylistService {
    private final PlaylistRepository playlistRepo;
    private final TrackRepository trackRepo;
    private final PlaylistTrackRepository playlistTrackRepo;

    public PlaylistService(PlaylistRepository playlistRepo,
                           TrackRepository trackRepo,
                           PlaylistTrackRepository playlistTrackRepo) {
        this.playlistRepo = playlistRepo;
        this.trackRepo = trackRepo;
        this.playlistTrackRepo = playlistTrackRepo;
    }

    public List<Playlist> getAllPlaylists() {
        return playlistRepo.findAll();
    }

    public void addTrackToPlaylist(Long playlistId, Long trackId, int position) {
        // Загружаем существующие сущности
        Playlist playlist = playlistRepo.findById(playlistId)
                .orElseThrow(() -> new EntityNotFoundException("Playlist not found"));
        Track track = trackRepo.findById(trackId)
                .orElseThrow(() -> new EntityNotFoundException("Track not found"));

        // Формируем ключ и саму запись
        PlaylistTrackKey key = new PlaylistTrackKey(playlistId, trackId);
        PlaylistTrack entry = new PlaylistTrack();
        entry.setId(key);
        entry.setPlaylist(playlist);
        entry.setTrack(track);
        entry.setPosition(position);

        // Сохраняем
        playlistTrackRepo.save(entry);
    }
}
