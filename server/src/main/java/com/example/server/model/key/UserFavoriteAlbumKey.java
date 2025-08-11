package com.example.server.model.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class UserFavoriteAlbumKey implements Serializable {
    @Column(name = "user_id")
    private String userId;
    @Column(name = "album_id")
    private Long albumId;

    public UserFavoriteAlbumKey() {}
    public UserFavoriteAlbumKey(String userId, Long albumId) {
        this.userId = userId;
        this.albumId = albumId;
    }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof UserFavoriteAlbumKey)) return false;
        UserFavoriteAlbumKey that = (UserFavoriteAlbumKey) o;
        return Objects.equals(userId, that.userId) && Objects.equals(albumId, that.albumId);
    }
    @Override public int hashCode() { return Objects.hash(userId, albumId); }
}