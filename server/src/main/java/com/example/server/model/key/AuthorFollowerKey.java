package com.example.server.model.key;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;
import jakarta.persistence.Table;

import java.io.Serializable;
import java.util.Objects;

@Embeddable
public class AuthorFollowerKey implements Serializable {
    @Column(name = "author_id")
    private String authorId;
    @Column(name = "follower_id")
    private String followerId;

    public AuthorFollowerKey() {}
    public AuthorFollowerKey(String authorId, String followerId) {
        this.authorId = authorId;
        this.followerId = followerId;
    }
    @Override public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof AuthorFollowerKey)) return false;
        AuthorFollowerKey that = (AuthorFollowerKey) o;
        return Objects.equals(authorId, that.authorId) && Objects.equals(followerId, that.followerId);
    }
    @Override public int hashCode() { return Objects.hash(authorId, followerId); }
}