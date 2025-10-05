CREATE INDEX IF NOT EXISTS idx_playlist_tracks_playlist_id_position
    ON playlist_tracks (playlist_id, position);
