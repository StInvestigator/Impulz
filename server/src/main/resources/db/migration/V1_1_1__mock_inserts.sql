-- USERS
INSERT INTO users (id, username, email, password_hash, image_url)
VALUES (1, 'Alice', 'alice@example.com', 'hashed_pw_1', 'https://img.com/alice.jpg'),
       (2, 'Bob', 'bob@example.com', 'hashed_pw_2', 'https://img.com/bob.jpg'),
       (3, 'Charlie', 'charlie@example.com', 'hashed_pw_3', 'https://img.com/charlie.jpg');

-- AUTHORS
INSERT INTO authors (user_id, bio)
VALUES (1, 'Electronic music producer.'),
       (2, 'Singer-songwriter.');

-- ROLES
INSERT INTO user_roles (user_id, role_id)
VALUES (1, 2), -- alice is AUTHOR
       (1, 1), -- and USER
       (2, 2),
       (2, 1),
       (3, 1);

-- GENRES
INSERT INTO genres (id, name)
VALUES (1, 'Electronic'),
       (2, 'Pop');

-- ALBUMS
INSERT INTO albums (id, title, release_date, image_url)
VALUES (1, 'Neon Dreams', '2024-08-01', 'https://img.com/neon.jpg'),
       (2, 'Heartbeats', '2024-09-15', 'https://img.com/heartbeats.jpg');

-- TRACKS
INSERT INTO tracks (id, album_id, title, duration_sec, file_url, likes)
VALUES (1, 1, 'Night Drive', 210, 'https://tracks.com/nightdrive.mp3', 123),
       (2, 2, 'Open Sky', 180, 'https://tracks.com/opensky.mp3', 88);

-- TRACK-AUTHORS (many-to-many)
INSERT INTO track_authors (track_id, author_id)
VALUES (1, 1),
       (2, 1),
       (2, 2);

INSERT INTO album_authors (album_id, author_id)
VALUES (1, 1),
       (2, 1),
       (2, 2);

-- TRACK-GENRES
INSERT INTO track_genres (track_id, genre_id)
VALUES (1, 1),
       (2, 2);

-- PLAYLISTS
INSERT INTO playlists (id, owner_id, title, is_public, image_url)
VALUES (1, 3, 'My Favorites', true, 'https://img.com/favorites.jpg');

-- PLAYLIST_TRACKS
INSERT INTO playlist_tracks (playlist_id, track_id, position)
VALUES (1, 1, 1),
       (1, 2, 2);

-- AUTHOR FOLLOWERS
INSERT INTO author_followers (author_id, follower_id)
VALUES (1, 3),
       (2, 3);

-- TRACK PLAYS
INSERT INTO track_plays (track_id, user_id, played_at)
VALUES (1, 3, now()),
       (2, 3, now());

-- FAVORITES
INSERT INTO user_favorite_albums (user_id, album_id)
VALUES (3, 1);
INSERT INTO user_favorite_playlists (user_id, playlist_id)
VALUES (3, 1);
