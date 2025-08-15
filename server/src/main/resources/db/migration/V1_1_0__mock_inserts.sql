
INSERT INTO users (keycloak_id, username, email, avatar_url) VALUES
('a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8', 'Alice', 'alice@example.com', 'https://img.com/alice.jpg'),
('b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9', 'Bob', 'bob@example.com', 'https://img.com/bob.jpg'),
('c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0', 'Charlie', 'charlie@example.com', 'https://img.com/charlie.jpg');

INSERT INTO authors (user_id, bio) VALUES
('a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8', 'Electronic music producer.'),
('b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9', 'Singer-songwriter.');

INSERT INTO genres (name) VALUES
('Electronic'),
('Pop'),
('Rock');

INSERT INTO albums (title, release_date, image_url) VALUES
('Neon Dreams', '2024-08-01', 'https://img.com/neon.jpg'),
('Heartbeats', '2024-09-15', 'https://img.com/heartbeats.jpg');

INSERT INTO tracks (album_id, title, duration_sec, file_url) VALUES
(1, 'Night Drive', 210, 'https://tracks.com/nightdrive.mp3'),
(1, 'Midnight Pulse', 195, 'https://tracks.com/midnight.mp3'),
(2, 'Open Sky', 180, 'https://tracks.com/opensky.mp3');

INSERT INTO track_authors (track_id, author_id) VALUES
(1, 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8'),
(2, 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8'),
(3, 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8'),
(3, 'b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9');

INSERT INTO album_authors (album_id, author_id) VALUES
(1, 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8'),
(2, 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8'),
(2, 'b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9');

INSERT INTO track_genres (track_id, genre_id) VALUES
(1, 1),
(2, 1),
(3, 2);

INSERT INTO playlists (owner_id, title, is_public, image_url) VALUES
('c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0', 'My Favorites', true, 'https://img.com/favorites.jpg'),
('c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0', 'Workout Mix', false, 'https://img.com/workout.jpg');

INSERT INTO playlist_tracks (playlist_id, track_id) VALUES
(1, 1),
(1, 3),
(2, 2);

INSERT INTO author_followers (author_id, follower_id) VALUES
('a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8', 'c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0'),
('b2c3d4e5-f6g7-8901-h2i3-j4k5l6m7n8o9', 'c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0');

INSERT INTO track_plays (track_id, user_id) VALUES
(1, 'c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0'),
(3, 'c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0'),
(1, 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8');

INSERT INTO user_favorite_albums (user_id, album_id) VALUES
    ('c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0', 1);

INSERT INTO user_favorite_playlists (user_id, playlist_id) VALUES
    ('c3d4e5f6-g7h8-9012-i3j4-k5l6m7n8o9p0', 1);

UPDATE authors SET followers_count = 1 WHERE user_id = 'a1b2c3d4-e5f6-7890-g1h2-i3j4k5l6m7n8';
UPDATE authors SET followers_count = 1 WHERE user_id = 'b2c4d5e6-f7g8-9012-h3i4-j5k6l7m8n9o0';

UPDATE tracks SET total_plays = 2 WHERE id = 1;
UPDATE tracks SET total_plays = 1 WHERE id = 3;