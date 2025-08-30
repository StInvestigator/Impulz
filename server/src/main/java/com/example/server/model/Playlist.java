package com.example.server.model;

import com.example.server.model.id.PlaylistTrack;
import com.example.server.model.id.UserFavoritePlaylist;
import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import java.time.OffsetDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@ToString(exclude = {"owner","tracks","favoredBy"})
@EqualsAndHashCode(exclude = {"owner","tracks","favoredBy"})
@Entity
@Table(name = "playlists")
public class Playlist {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY) private Long id;
    @ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "owner_id", nullable = false) private User owner;
    @Column(nullable = false, length = 200) private String title;
    @Column(name = "is_public") private Boolean isPublic;
    @Column(name = "image_url") private String imageUrl;
    @Column(name = "created_at", nullable = false) private OffsetDateTime createdAt;
    @OneToMany(mappedBy = "playlist") private Set<PlaylistTrack> tracks = new HashSet<>();
    @OneToMany(mappedBy = "playlist") private Set<UserFavoritePlaylist> favoredBy = new HashSet<>();

    @Transient
    public Long getLikesCount(){
        return (long) favoredBy.size();
    }
}
