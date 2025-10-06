CREATE TABLE user_favorite_tracks
(
    user_id  VARCHAR(36) REFERENCES users (keycloak_id) ON DELETE CASCADE,
    track_id BIGINT REFERENCES tracks (id) ON DELETE CASCADE,
    added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
    PRIMARY KEY (user_id, track_id)
);

CREATE INDEX idx_user_fav_tracks_added_at ON user_favorite_tracks (added_at);