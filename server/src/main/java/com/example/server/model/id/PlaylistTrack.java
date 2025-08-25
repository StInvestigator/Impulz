package com.example.server.model.id;

import com.example.server.model.Album;
import com.example.server.model.Playlist;
import com.example.server.model.Track;
import com.example.server.model.key.PlaylistTrackKey;
import com.example.server.model.key.UserFavoriteAlbumKey;
import com.example.server.model.key.UserFavoritePlaylistKey;
import com.example.server.model.User;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.OffsetDateTime;

@Data
@Entity
@ToString(exclude = {"playlist","track"})
@Table(name = "playlist_tracks")
public class PlaylistTrack {
    @EmbeddedId
    private PlaylistTrackKey id;

    @ManyToOne
    @MapsId("playlistId")
    @JoinColumn(name = "playlist_id")
    private Playlist playlist;

    @ManyToOne
    @MapsId("trackId")
    @JoinColumn(name = "track_id")
    private Track track;

    @Column(nullable = false)
    private Integer position;


}