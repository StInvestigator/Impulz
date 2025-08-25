package com.example.server.model;

import com.example.server.model.id.UserFavoriteAlbum;
import com.example.server.model.id.UserFavoritePlaylist;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@ToString(exclude = {"user","track"})
@Table(name = "track_plays")
public class TrackPlay {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "track_id", nullable = false)
    private Track track;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_keycloak_id", referencedColumnName = "keycloak_id")
    private User user;

    @Column(name = "played_at", nullable = false)
    private OffsetDateTime playedAt;
}
