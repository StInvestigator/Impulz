package com.example.server.model;

import com.example.server.model.id.PlaylistTrack;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "tracks")
public class Track {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "album_id")
    private Album album;
    @Column(nullable = false, length = 200)
    private String title;
    @Column(name = "duration_sec", nullable = false)
    private Integer durationSec;
    @Column(name = "file_url", nullable = false)
    private String fileUrl;
    @Column(nullable = false)
    private Long likes;
    @Column(name = "total_plays", nullable = false)
    private Long totalPlays;
    @Column(name = "created_at", nullable = false)
    private OffsetDateTime createdAt;

    @ManyToMany
    @JoinTable(
            name = "track_authors",
            joinColumns = @JoinColumn(name = "track_id"),
            inverseJoinColumns = @JoinColumn(name = "author_id")
    )
    private Set<Author> authors = new HashSet<>();
    @ManyToMany
    @JoinTable(
            name = "track_genres",
            joinColumns = @JoinColumn(name = "track_id"),
            inverseJoinColumns = @JoinColumn(name = "genre_id")
    )
    private Set<Genre> genres = new HashSet<>();
    @OneToMany(mappedBy = "track") private Set<Subtitle> subtitles = new HashSet<>();
    @OneToMany(mappedBy = "track") private Set<TrackPlay> plays = new HashSet<>();
    @OneToMany(mappedBy = "track") private Set<PlaylistTrack> playlistEntries = new HashSet<>();
}