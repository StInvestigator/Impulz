CREATE INDEX IF NOT EXISTS idx_track_authors_author_id_track_id
    ON track_authors (author_id, track_id);

CREATE INDEX IF NOT EXISTS idx_track_plays_played_at_track_id
    ON track_plays (played_at, track_id);