package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@Entity
@ToString(exclude = {"tracks"})
@Table(name = "genres")
public class Genre {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(nullable = false, unique = true, length = 50)
    private String name;
    @ManyToMany(fetch = FetchType.LAZY,mappedBy = "genres") private Set<Track> tracks = new HashSet<>();
}