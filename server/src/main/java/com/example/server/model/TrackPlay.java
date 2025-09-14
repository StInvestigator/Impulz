package com.example.server.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.OffsetDateTime;

@Data
@Entity
@ToString(exclude = {"user", "track"})
@EqualsAndHashCode(exclude = {"user", "track"})
@Table(name = "track_plays")
public class TrackPlay {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "track_id", nullable = false)
    private Track track;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", referencedColumnName = "keycloak_id")
    private User user;

    @Column(name = "played_at", nullable = false)
    private OffsetDateTime playedAt;

    @Column(name = "session_id", unique = true, length = 50)
    private String sessionId;
}
