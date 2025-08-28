CREATE TABLE users (
                       keycloak_id VARCHAR(36) PRIMARY KEY,
                       username VARCHAR(50) UNIQUE NOT NULL,
                       email VARCHAR(100) UNIQUE NOT NULL,
                       avatar_url TEXT,
                       created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE authors (
                         user_id VARCHAR(36) PRIMARY KEY REFERENCES users (keycloak_id) ON DELETE CASCADE,
                         bio TEXT,
                         created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                         followers_count BIGINT NOT NULL DEFAULT 0
);

CREATE TABLE albums (
                        id SERIAL PRIMARY KEY,
                        title VARCHAR(200) NOT NULL,
                        release_date DATE,
                        image_url TEXT,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE tracks (
                        id SERIAL PRIMARY KEY,
                        album_id BIGINT REFERENCES albums (id) ON DELETE SET NULL,
                        title VARCHAR(200) NOT NULL,
                        duration_sec INT NOT NULL,
                        file_url TEXT NOT NULL,
                        likes BIGINT NOT NULL DEFAULT 0,
                        total_plays BIGINT NOT NULL DEFAULT 0,
                        created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE genres (
                        id SERIAL PRIMARY KEY,
                        name VARCHAR(50) UNIQUE NOT NULL
);

CREATE TABLE track_genres (
                              track_id BIGINT REFERENCES tracks (id) ON DELETE CASCADE,
                              genre_id BIGINT REFERENCES genres (id) ON DELETE CASCADE,
                              PRIMARY KEY (track_id, genre_id)
);

CREATE TABLE subtitles (
                           id SERIAL PRIMARY KEY,
                           track_id BIGINT REFERENCES tracks (id) ON DELETE CASCADE,
                           start_time_ms INT NOT NULL,
                           end_time_ms INT NOT NULL,
                           text TEXT NOT NULL
);

CREATE INDEX idx_subtitles_track_time ON subtitles (track_id, start_time_ms, end_time_ms);

CREATE TABLE track_authors (
                               track_id  BIGINT REFERENCES tracks  (id) ON DELETE CASCADE,
                               author_id VARCHAR(36) REFERENCES authors (user_id) ON DELETE CASCADE,
                               PRIMARY KEY (track_id, author_id)
);

CREATE TABLE album_authors (
                               album_id BIGINT REFERENCES albums(id) ON DELETE CASCADE,
                               author_id VARCHAR(36) REFERENCES authors(user_id) ON DELETE CASCADE,
                               PRIMARY KEY (album_id, author_id)
);

CREATE TABLE playlists (
                           id SERIAL PRIMARY KEY,
                           owner_id VARCHAR(36) REFERENCES users (keycloak_id) ON DELETE CASCADE,
                           title VARCHAR(200) NOT NULL,
                           is_public BOOLEAN DEFAULT FALSE,
                           image_url TEXT,
                           created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE playlist_tracks (
                                 playlist_id BIGINT REFERENCES playlists (id) ON DELETE CASCADE,
                                 track_id BIGINT REFERENCES tracks (id) ON DELETE CASCADE,
                                 PRIMARY KEY (playlist_id, track_id)
);

CREATE TABLE author_followers (
                                  author_id VARCHAR(36) REFERENCES authors (user_id) ON DELETE CASCADE,
                                  follower_id VARCHAR(36) REFERENCES users (keycloak_id) ON DELETE CASCADE,
                                  followed_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                                  PRIMARY KEY (author_id, follower_id)
);

CREATE TABLE track_plays (
                             id BIGSERIAL PRIMARY KEY,
                             track_id BIGINT REFERENCES tracks (id) ON DELETE CASCADE,
                             user_id VARCHAR(36) REFERENCES users (keycloak_id) ON DELETE SET NULL,
                             played_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE MATERIALIZED VIEW author_monthly_plays AS
SELECT
    ta.author_id,
    date_trunc('month', p.played_at) AS month,
  COUNT(*) AS plays_count
FROM
    track_plays p
    JOIN track_authors ta ON ta.track_id = p.track_id
GROUP BY
    ta.author_id,
    date_trunc('month', p.played_at);

CREATE INDEX idx_author_monthly ON author_monthly_plays (author_id, month);

CREATE FUNCTION increment_track_plays() RETURNS TRIGGER AS $$
BEGIN
UPDATE tracks
SET total_plays = total_plays + 1
WHERE id = NEW.track_id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_inc_play
    AFTER INSERT ON track_plays
    FOR EACH ROW
    EXECUTE FUNCTION increment_track_plays();


CREATE OR REPLACE FUNCTION trg_inc_author_followers() RETURNS TRIGGER AS $$
BEGIN
UPDATE authors
SET followers_count = followers_count + 1
WHERE user_id = NEW.author_id;
RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE OR REPLACE FUNCTION trg_dec_author_followers() RETURNS TRIGGER AS $$
BEGIN
UPDATE authors
SET followers_count = followers_count - 1
WHERE user_id = OLD.author_id;
RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Триггеры
CREATE TRIGGER trg_inc_author_followers
    AFTER INSERT ON author_followers
    FOR EACH ROW EXECUTE FUNCTION trg_inc_author_followers();

CREATE TRIGGER trg_dec_author_followers
    AFTER DELETE ON author_followers
    FOR EACH ROW EXECUTE FUNCTION trg_dec_author_followers();


CREATE TABLE user_favorite_playlists (
                                         user_id     VARCHAR(36) REFERENCES users     (keycloak_id) ON DELETE CASCADE,
                                         playlist_id BIGINT REFERENCES playlists (id) ON DELETE CASCADE,
                                         added_at    TIMESTAMP WITH TIME ZONE DEFAULT now(),
                                         PRIMARY KEY (user_id, playlist_id)
);

CREATE TABLE user_favorite_albums (
                                      user_id  VARCHAR(36) REFERENCES users  (keycloak_id) ON DELETE CASCADE,
                                      album_id BIGINT REFERENCES albums (id) ON DELETE CASCADE,
                                      added_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
                                      PRIMARY KEY (user_id, album_id)
);

CREATE MATERIALIZED VIEW user_quick_access AS
SELECT
    u.keycloak_id      AS user_id,
    fp.playlist_id     AS favorite_playlist,
    fa.album_id        AS favorite_album,
    fp.added_at        AS playlist_added,
    fa.added_at        AS album_added
FROM users u
         LEFT JOIN user_favorite_playlists fp ON fp.user_id = u.keycloak_id
         LEFT JOIN user_favorite_albums    fa ON fa.user_id = u.keycloak_id;

CREATE INDEX idx_quick_access_user ON user_quick_access (user_id);