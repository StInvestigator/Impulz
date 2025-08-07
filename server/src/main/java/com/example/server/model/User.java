package com.example.server.model;

import com.example.server.model.id.UserFavoriteAlbum;
import com.example.server.model.id.UserFavoritePlaylist;
import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Getter
@Setter
@ToString(exclude = {"playlists"})
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(nullable = false, unique = true, length = 50)
    private String username;
    @Column(nullable = false, unique = true, length = 100)
    private String email;
    @Column(name = "password_hash", nullable = false)
    private String passwordHash;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @OneToMany(mappedBy = "owner", fetch = FetchType.LAZY)
    private Set<Playlist> playlists = new HashSet<>();

    @OneToMany(mappedBy = "user")
    private Set<UserFavoriteAlbum> favoriteAlbums = new HashSet<>();
    @OneToMany(mappedBy = "user")
    private Set<UserFavoritePlaylist> favoritePlaylists = new HashSet<>();
    @OneToOne(mappedBy = "user")
    private Author authorProfile;
}