package com.example.server.model;

import com.example.server.model.id.AuthorFollower;
import jakarta.persistence.*;
import lombok.Data;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "authors")
public class Author {
    @Id
    @Column(name = "user_id")
    private Long userId;
    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id")
    private User user;
    @Column(columnDefinition = "TEXT")
    private String bio;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
    @Column(name = "followers_count", nullable = false)
    private Long followersCount;

    @ManyToMany(mappedBy = "authors")
    private Set<Track> tracks = new HashSet<>();
    @ManyToMany(mappedBy = "authors")
    private Set<Album> albums = new HashSet<>();
    @OneToMany(mappedBy = "author")
    private Set<AuthorFollower> followers = new HashSet<>();
}