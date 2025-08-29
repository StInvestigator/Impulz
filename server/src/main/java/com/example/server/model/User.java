package com.example.server.model;

import com.example.server.model.id.UserFavoriteAlbum;
import com.example.server.model.id.UserFavoritePlaylist;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@ToString(exclude = {"authorProfile","playlists","favoriteAlbums","favoritePlaylists"})
@EqualsAndHashCode(exclude = {"avatarUrl","authorProfile","playlists","favoriteAlbums","favoritePlaylists"})
@Table(name = "users")
public class User {
    @Id
    @Column(name = "keycloak_id", unique = true, nullable = false, length = 36)
    private String id;

    @Column(nullable = false, length = 50, unique = true)
    private String username;

    @Column(nullable = false, length = 100, unique = true)
    private String email;

    @Column(name = "avatar_url", columnDefinition = "TEXT")
    private String avatarUrl;

    @Column(name = "created_at", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime createdAt = OffsetDateTime.now();

    @OneToOne(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private Author authorProfile;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Playlist> playlists = new HashSet<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<UserFavoriteAlbum> favoriteAlbums = new HashSet<>();

    @OneToMany(mappedBy = "user",cascade = CascadeType.ALL,orphanRemoval = true)
    private Set<UserFavoritePlaylist> favoritePlaylists = new HashSet<>();
}