package com.example.server.data.repository;

import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.key.PlaylistTrackKey;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlaylistTrackRepository extends JpaRepository<PlaylistTrack, PlaylistTrackKey> {
    boolean existsById_PlaylistIdAndId_TrackId(Long playlistId, Long trackId);
}