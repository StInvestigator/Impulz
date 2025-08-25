package com.example.server.model.id;

import com.example.server.model.*;
import com.example.server.model.key.AuthorFollowerKey;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.time.OffsetDateTime;

@Data
@Entity
@ToString(exclude = {"author","follower"})
@Table(name = "author_followers")
public class AuthorFollower {
    @EmbeddedId
    private AuthorFollowerKey id;

    @ManyToOne
    @MapsId("authorId")
    @JoinColumn(name = "author_id")
    private Author author;

    @ManyToOne
    @MapsId("followerId")
    @JoinColumn(name = "follower_id")
    private User follower;

    @Column(name = "followed_at", nullable = false)
    private OffsetDateTime followedAt;
}