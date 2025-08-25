package com.example.server.model.id;

import com.example.server.model.Playlist;
import com.example.server.model.key.UserFavoritePlaylistKey;
import com.example.server.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.OffsetDateTime;

@Data
@Entity
@ToString(exclude = {"user","playlist"})
@Table(name = "user_favorite_playlists")
public class UserFavoritePlaylist {
    @EmbeddedId
    private UserFavoritePlaylistKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("playlistId")
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    @Column(name = "added_at", nullable = false)
    private OffsetDateTime addedAt;
}
