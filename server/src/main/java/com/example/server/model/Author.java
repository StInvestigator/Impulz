package com.example.server.model;

import com.example.server.model.id.AuthorFollower;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@ToString(exclude = {"albums","tracks","followers"})
@EqualsAndHashCode(exclude = {"user","albums","tracks","followers"})
@Table(name = "authors")
public class Author {
    @Id
    @Column(name = "user_id")
    private String id;

    @OneToOne
    @MapsId
    @JoinColumn(name = "user_id", referencedColumnName = "keycloak_id")
    private User user;

    @Column(name = "created_at", nullable = false,
            columnDefinition = "TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP")
    private OffsetDateTime createdAt = OffsetDateTime.now();


    @Column(name = "followers_count", nullable = false)
    private Long followersCount;

    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "authors")
    private Set<Track> tracks = new HashSet<>();

    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "authors")
    private Set<Album> albums = new HashSet<>();

    @OneToMany(mappedBy = "author")
    private Set<AuthorFollower> followers = new HashSet<>();
}