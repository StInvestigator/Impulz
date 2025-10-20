package com.example.server.model.id;
import com.example.server.model.Track;
import com.example.server.model.User;
import com.example.server.model.key.UserFavoriteTrackKey;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;
import java.time.OffsetDateTime;

@Data
@Entity
@ToString(exclude = {"user","track"})
@Table(name = "user_favorite_tracks")
public class UserFavoriteTrack {
    @EmbeddedId
    private UserFavoriteTrackKey id;

    @ManyToOne
    @MapsId("userId")
    @JoinColumn(name = "user_id")
    private User user;

    @ManyToOne
    @MapsId("trackId")
    @JoinColumn(name = "track_id")
    private Track track;

    @Column(name = "added_at", nullable = false)
    private OffsetDateTime addedAt;
}
