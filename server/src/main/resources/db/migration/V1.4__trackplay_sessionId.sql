ALTER TABLE track_plays
ADD COLUMN session_id VARCHAR(50) UNIQUE;

CREATE INDEX idx_track_plays_session_id ON track_plays(session_id);