package com.example.server.model.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserFavoritePlaylistKey implements Serializable {
    @Column(name = "user_id")
    private String userId;
    @Column(name = "playlist_id")
    private Long playlistId;

    public UserFavoritePlaylistKey() {}
    public UserFavoritePlaylistKey(String userId, Long playlistId) {
        this.userId = userId;
        this.playlistId = playlistId;
    }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserFavoritePlaylistKey)) return false;
        UserFavoritePlaylistKey that = (UserFavoritePlaylistKey) o;
        return Objects.equals(userId, that.userId) && Objects.equals(playlistId, that.playlistId);
    }
    @Override public int hashCode() { return Objects.hash(userId, playlistId); }
}