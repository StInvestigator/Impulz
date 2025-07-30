package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@Table(name = "subtitles")
public class Subtitle {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @ManyToOne
    @JoinColumn(name = "track_id", nullable = false)
    private Track track;
    @Column(name = "start_time_ms", nullable = false) private Integer startTimeMs;
    @Column(name = "end_time_ms", nullable = false) private Integer endTimeMs;
    @Column(columnDefinition = "TEXT", nullable = false) private String text;
}