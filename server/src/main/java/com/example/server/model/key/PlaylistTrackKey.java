package com.example.server.model.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class PlaylistTrackKey implements Serializable {
    @Column(name = "playlist_id")
    private Long playlistId;
    @Column(name = "track_id")
    private Long trackId;

    public PlaylistTrackKey() {}
    public PlaylistTrackKey(Long playlistId, Long trackId) {
        this.playlistId = playlistId;
        this.trackId = trackId;
    }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof PlaylistTrackKey)) return false;
        PlaylistTrackKey that = (PlaylistTrackKey) o;
        return Objects.equals(playlistId, that.playlistId) && Objects.equals(trackId, that.trackId);
    }
    @Override public int hashCode() { return Objects.hash(playlistId, trackId); }
}
