package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "albums")
public class Album {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToMany
    @JoinTable(
            name = "album_authors",
            joinColumns = @JoinColumn(name = "album_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors = new HashSet<>();
    @Column(nullable = false, length = 200)
    private String title;
    @Column(name = "release_date")
    private LocalDate releaseDate;
    @Column(name = "image_url")
    private String imageUrl;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;
    @OneToMany(mappedBy = "album")
    private Set<Track> tracks = new HashSet<>();
}
