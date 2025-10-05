CREATE INDEX IF NOT EXISTS idx_playlists_owner_id_title
    ON playlists (owner_id, title);
