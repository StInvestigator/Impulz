CREATE INDEX idx_track_plays_recent
    ON track_plays (track_id, played_at);