package com.example.server.model.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserFavoriteTrackKey implements Serializable {
    @Column(name = "user_id")
    private String userId;
    @Column(name = "track_id")
    private Long trackId;

    public UserFavoriteTrackKey() {}
    public UserFavoriteTrackKey(String userId, Long trackId) {
        this.userId = userId;
        this.trackId = trackId;
    }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserFavoriteTrackKey)) return false;
        UserFavoriteTrackKey that = (UserFavoriteTrackKey) o;
        return Objects.equals(userId, that.userId) && Objects.equals(trackId, that.trackId);
    }
    @Override public int hashCode() { return Objects.hash(userId, trackId); }
}