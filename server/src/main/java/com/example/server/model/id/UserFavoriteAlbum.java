package com.example.server.model.id;

import com.example.server.model.Album;
import com.example.server.model.Playlist;
import com.example.server.model.key.UserFavoriteAlbumKey;
import com.example.server.model.key.UserFavoritePlaylistKey;
import com.example.server.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.OffsetDateTime;

@Data
@Entity
@ToString(exclude = {"user","album"})
@Table(name = "user_favorite_albums")
public class UserFavoriteAlbum {
    @EmbeddedId
    private UserFavoriteAlbumKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("albumId")
    @JoinColumn(name = "album_id")
    private Album album;

    @Column(name = "added_at", nullable = false)
    private OffsetDateTime addedAt;
}