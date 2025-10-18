-- 1) USERS (10) — реальные исполнители (UUIDы сохранены)
INSERT INTO users (keycloak_id, username, email, avatar_url, created_at)
VALUES ('11111111-1111-4111-8111-111111111111', 'Adele', 'adele@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Adele.jpg',
        now() - interval '40 days'),
       ('22222222-2222-4222-8222-222222222222', 'The Weeknd', 'theweeknd@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/TheWeeknd.jpg', now() - interval '38 days'),
       ('33333333-3333-4333-8333-333333333333', 'Norah Jones', 'norah@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/NorahJones.jpg', now() - interval '36 days'),
       ('44444444-4444-4444-8444-444444444444', 'Coldplay', 'coldplay@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Coldplay.jpg', now() - interval '34 days'),
       ('55555555-5555-4555-8555-555555555555', 'Ludovico Einaudi', 'einaudi@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/LudovicoEinaudi.jpg', now() - interval '32 days'),
       ('66666666-6666-4666-8666-666666666666', 'Kendrick Lamar', 'kendrick@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/KendrickLamar.jpg', now() - interval '30 days'),
       ('77777777-7777-4777-8777-777777777777', 'Mumford And Sons', 'mumford@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/MumfordAndSons.jpg', now() - interval '28 days'),
       ('88888888-8888-4888-8888-888888888888', 'Metallica', 'metallica@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Metallica.jpg', now() - interval '26 days'),
       ('99999999-9999-4999-8999-999999999999', 'Brian Eno', 'eno@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/BrianEno.jpg',
        now() - interval '24 days'),
       ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Bob Marley', 'bob@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/BobMarley.jpg',
        now() - interval '22 days');

-- 2) AUTHORS (10)
INSERT INTO authors (user_id, created_at)
VALUES ('11111111-1111-4111-8111-111111111111', now() - interval '39 days'),
       ('22222222-2222-4222-8222-222222222222',
        now() - interval '37 days'),
       ('33333333-3333-4333-8333-333333333333',
        now() - interval '35 days'),
       ('44444444-4444-4444-8444-444444444444', now() - interval '33 days'),
       ('55555555-5555-4555-8555-555555555555',
        now() - interval '31 days'),
       ('66666666-6666-4666-8666-666666666666', now() - interval '29 days'),
       ('77777777-7777-4777-8777-777777777777', now() - interval '27 days'),
       ('88888888-8888-4888-8888-888888888888', now() - interval '25 days'),
       ('99999999-9999-4999-8999-999999999999',
        now() - interval '23 days'),
       ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', now() - interval '21 days');

-- 3) GENRES (оставляем прежние 10)
INSERT INTO genres (id, name, ua_name, image_url)
VALUES (1, 'Pop', 'Поп', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/woman_singing.png'),
       (2, 'Rock', 'Рок', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/chill_wide_guy.png'),
       (3, 'Jazz', 'Джаз', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/cool_man_with_saxaphone.png'),
       (11, 'Rap', 'Реп', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/rapper.png'),
       (4, 'Classical', 'Класика', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/old_man_playing_saxaphone.png'),
       (5, 'Electronic', 'Електронна', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/cool_man_with_headphones.png'),
       (6, 'Hip-Hop', 'Хіп-хоп', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/cool_man_with_hat.png'),
       (7, 'Folk', 'Фолк', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/woman_with_guitar.png'),
       (8, 'Metal', 'Метал', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/strong_angry_man_with_guitar.png'),
       (9, 'Ambient', 'Ембієнт', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/girl_with_violin.png'),
       (10, 'Reggae', 'Реггі', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/black_man_with_dreds.png'),
       (12, 'K-pop', 'К-поп', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/korean.png');

-- 4) ALBUMS (10) — реальные альбомы
INSERT INTO albums (id, title, release_date, image_url, created_at)
VALUES (1, '30', '2021-11-19', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/30.jpg',
        now() - interval '400 days'),
       (2, 'After Hours', '2020-03-20', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/AfterHours.jpg',
        now() - interval '350 days'),
       (3, 'Come Away With Me', '2002-02-26',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/ComeAwayWithMe.jpg',
        now() - interval '300 days'),
       (4, 'A Rush of Blood to the Head', '2002-08-26',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/ARushofBloodtotheHead.jpg',
        now() - interval '320 days'),
       (5, 'Elements', '2015-01-30', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Elements.jpg',
        now() - interval '450 days'),
       (6, 'DAMN.', '2017-04-14', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/DAMN.jpg',
        now() - interval '200 days'),
       (7, 'Sigh No More', '2009-10-05', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/SighNoMore.jpg',
        now() - interval '220 days'),
       (8, 'Master of Puppets', '1986-03-03',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/MasterofPuppets.jpg',
        now() - interval '160 days'),
       (9, 'Ambient 1: Music for Airports', '1978-03-01',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Ambient1MusicforAirports.jpg',
        now() - interval '140 days'),
       (10, 'Legend', '1984-05-08', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Legend.jpg',
        now() - interval '280 days');

-- 5) ALBUM_AUTHORS (map albums -> authors)
INSERT INTO album_authors (album_id, author_id)
VALUES (1, '11111111-1111-4111-8111-111111111111'),
       (2, '22222222-2222-4222-8222-222222222222'),
       (3, '33333333-3333-4333-8333-333333333333'),
       (4, '44444444-4444-4444-8444-444444444444'),
       (5, '55555555-5555-4555-8555-555555555555'),
       (6, '66666666-6666-4666-8666-666666666666'),
       (6, '22222222-2222-4222-8222-222222222222'),
       (7, '77777777-7777-4777-8777-777777777777'),
       (8, '88888888-8888-4888-8888-888888888888'),
       (9, '99999999-9999-4999-8999-999999999999'),
       (10, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');

-- 6) TRACKS (30) — по 3 трека на альбом (id 1..30)
INSERT INTO tracks (id, album_id, title, duration_sec, file_url, likes, created_at)
VALUES
-- album 1 (Adele)
(1, 1, 'Strangers By Nature', 182, 'music/Adele-StrangersByNature.mp3', 1200,
 now() - interval '390 days'),
(2, 1, 'Easy On Me', 224, 'music/Adele_Easy_On_Me.mp3', 5400, now() - interval '389 days'),
(3, 1, 'My Little Love', 389, 'music/Adele-MyLittleLove.mp3', 980,
 now() - interval '388 days'),
-- album 2 (The Weeknd)
(4, 2, 'Blinding Lights', 200, 'music/the-weeknd-blinding-lights.mp3', 8800,
 now() - interval '340 days'),
(5, 2, 'Save Your Tears', 215, 'music/TheWeeknd-SaveYourTears_(play.muzfan.net).mp3', 4700,
 now() - interval '339 days'),
(6, 2, 'In Your Eyes', 237, 'music/the-weeknd-in-your-eyes.mp3', 3200,
 now() - interval '338 days'),
-- album 3 (Norah Jones)
(7, 3, 'Don''t Know Why', 186, 'music/NorahJones-Don''tKnowWhy.mp3', 4100,
 now() - interval '295 days'),
(8, 3, 'Come Away With Me', 198, 'music/NorahJones-ComeAwayWithMe.mp3', 3700,
 now() - interval '294 days'),
(9, 3, 'Feelin'' The Same Way', 175, 'music/norah-jones-nora-dzhons--feelin-the-same-way.mp3', 600,
 now() - interval '293 days'),
-- album 4 (Coldplay)
(10, 4, 'Clocks', 307, 'music/coldplay-clocks-a-rush-of-blood-to-the-head-2002_(get-tune.net).mp3', 9200,
 now() - interval '315 days'),
(11, 4, 'The Scientist', 308, 'music/TheScientist.mp3', 8600,
 now() - interval '314 days'),
(12, 4, 'In My Place', 228, 'music/coldplay_in-my-place-coldplay.mp3', 4500,
 now() - interval '313 days'),
-- album 5 (Einaudi)
(13, 5, 'Experience', 315, 'music/LudovicoEinaudi-Experience.mp3', 2300, now() - interval '440 days'),
(14, 5, 'Nuvole Bianche', 358, 'music/LudovicoEinaudi-NuvoleBianche.mp3', 5400,
 now() - interval '439 days'),
(15, 5, 'Divenire', 434, 'music/LudovicoEinaudi-Divenire.mp3', 1900, now() - interval '438 days'),
-- album 6 (Kendrick Lamar)
(16, 6, 'HUMBLE.', 177, 'music/KendrickLamar-Humble.mp3', 7600, now() - interval '195 days'),
(17, 6, 'LOVE. (feat. Zacari)', 211, 'music/KendrickLamar-Love(Feat.Zacari).mp3', 4100,
 now() - interval '194 days'),
(18, 6, 'LOYALTY. (feat. Rihanna)', 227, 'music/KendrickLamar-Loyalty(Feat.Rihanna).mp3', 5200,
 now() - interval '193 days'),
-- album 7 (Mumford & Sons)
(19, 7, 'Little Lion Man', 258, 'music/Mumford_Sons_-_Little_Lion_Man_live_(mp3.pm).mp3', 3000,
 now() - interval '215 days'),
(20, 7, 'The Cave', 215, 'music/MumfordSons-TheCave.mp3', 4200, now() - interval '214 days'),
(21, 7, 'Roll Away Your Stone', 282, 'music/mumford-sons-roll-away-your-stone_(get-tune.net).mp3', 900,
 now() - interval '213 days'),
-- album 8 (Metallica)
(22, 8, 'Battery', 312, 'music/Metallica-Battery.mp3', 6100, now() - interval '150 days'),
(23, 8, 'Master of Puppets', 514, 'music/Metallica-MasterOfPuppets.mp3', 9800,
 now() - interval '149 days'),
(24, 8, 'Welcome Home (Sanitarium)', 388, 'music/Metallica-WelcomeHome(Sanitarium).mp3', 4300,
 now() - interval '148 days'),
-- album 9 (Brian Eno)
(25, 9, '1/1', 371, 'music/Brian_Eno_-_11.mp3', 800, now() - interval '130 days'),
(26, 9, '1/2', 725, 'music/Brian_Eno_-_12.mp3', 600, now() - interval '129 days'),
(27, 9, '2/1', 534, 'music/Brian_Eno_-_21.mp3', 450, now() - interval '128 days'),
-- album 10 (Bob Marley)
(28, 10, 'No Woman, No Cry', 226, 'music/bob-marley-no-woman-no-cry.mp3', 12500,
 now() - interval '270 days'),
(29, 10, 'Three Little Birds', 258, 'music/BobMarleyTheWailersfeat.TeniOxlade-ThreeLittleBirds.mp3', 7600,
 now() - interval '269 days'),
(30, 10, 'Redemption Song', 206, 'music/BobMarleyTheWailersfeat.AmiFaku-RedemptionSong.mp3', 9800,
 now() - interval '268 days');

-- 7) TRACK_AUTHORS (map each track to its real author)
INSERT INTO track_authors (track_id, author_id)
VALUES (1, '11111111-1111-4111-8111-111111111111'),
       (2, '11111111-1111-4111-8111-111111111111'),
       (3, '11111111-1111-4111-8111-111111111111'),
       (4, '22222222-2222-4222-8222-222222222222'),
       (5, '22222222-2222-4222-8222-222222222222'),
       (6, '22222222-2222-4222-8222-222222222222'),
       (7, '33333333-3333-4333-8333-333333333333'),
       (8, '33333333-3333-4333-8333-333333333333'),
       (9, '33333333-3333-4333-8333-333333333333'),
       (10, '44444444-4444-4444-8444-444444444444'),
       (11, '44444444-4444-4444-8444-444444444444'),
       (12, '44444444-4444-4444-8444-444444444444'),
       (13, '55555555-5555-4555-8555-555555555555'),
       (14, '55555555-5555-4555-8555-555555555555'),
       (15, '55555555-5555-4555-8555-555555555555'),
       (16, '66666666-6666-4666-8666-666666666666'),
       (17, '66666666-6666-4666-8666-666666666666'),
       (18, '66666666-6666-4666-8666-666666666666'),
       (19, '77777777-7777-4777-8777-777777777777'),
       (20, '77777777-7777-4777-8777-777777777777'),
       (21, '77777777-7777-4777-8777-777777777777'),
       (22, '88888888-8888-4888-8888-888888888888'),
       (23, '88888888-8888-4888-8888-888888888888'),
       (24, '88888888-8888-4888-8888-888888888888'),
       (25, '99999999-9999-4999-8999-999999999999'),
       (26, '99999999-9999-4999-8999-999999999999'),
       (27, '99999999-9999-4999-8999-999999999999'),
       (28, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
       (29, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'),
       (30, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa');

-- (пример коллаборации) добавим co-author: Kendrick feat. Rihanna уже в названии трека, но можно показать co-author linkage:
INSERT INTO track_authors (track_id, author_id)
VALUES (18, '22222222-2222-4222-8222-222222222222');
-- пример: The Weeknd as featured collaborator on track 18 (демонстрация)

-- 8) TRACK_GENRES (assign genres to треки)
INSERT INTO track_genres (track_id, genre_id)
VALUES (1, 1),
       (2, 1),
       (3, 1),
       (4, 1),
       (5, 1),
       (6, 5),
       (7, 3),
       (8, 3),
       (9, 3),
       (10, 2),
       (11, 2),
       (12, 2),
       (13, 4),
       (14, 4),
       (15, 4),
       (16, 6),
       (17, 6),
       (18, 6),
       (19, 7),
       (20, 7),
       (21, 7),
       (22, 8),
       (23, 8),
       (24, 8),
       (25, 9),
       (26, 9),
       (27, 9),
       (28, 10),
       (29, 10),
       (30, 10),
-- cross-genre examples
       (6, 1), -- In Your Eyes (The Weeknd) also has pop crossover
       (17, 5);
-- LOVE. (Kendrick) electronic/RnB touch

-- 9) SUBTITLES (тестовые, безопасные описания — без текстов песен)
INSERT INTO subtitles (track_id, start_time_ms, end_time_ms, text)
VALUES (1, 0, 15000, '[Intro] piano motif and hush'),
       (2, 0, 12000, '[Verse] gentle piano, vocal leads'),
       (3, 0, 14000, '[Bridge] spoken interlude'),
       (4, 0, 10000, '[Hook] bright synth loop'),
       (5, 0, 11000, '[Verse] echoed vocals'),
       (6, 0, 13000, '[Chorus] sax-like synth solo'),
       (7, 0, 16000, '[Intro] mellow guitar and piano'),
       (8, 0, 12000, '[Verse] soft jazz arrangement'),
       (9, 0, 15000, '[Solo] saxophone highlights'),
       (10, 0, 9000, '[Intro] piano arpeggio and clock-like motif'),
       (11, 0, 10000, '[Chorus] emotive vocal line'),
       (12, 0, 8000, '[Bridge] guitar texture'),
       (13, 0, 20000, '[Intro] swelling strings'),
       (14, 0, 14000, '[Theme] piano melody'),
       (15, 0, 17000, '[Crescendo] full ensemble'),
       (16, 0, 7000, '[Beat] staccato percussion'),
       (17, 0, 12000, '[Verse] melodic hook'),
       (18, 0, 9000, '[Feature] guest vocal part'),
       (19, 0, 11000, '[Chorus] stomping folk rhythm'),
       (20, 0, 13000, '[Verse] mandolin and banjo'),
       (21, 0, 10000, '[Outro] fading harmonies'),
       (22, 0, 15000, '[Intro] fast tremolo guitars'),
       (23, 0, 16000, '[Main] heavy riffing'),
       (23, 16000, 32000, '[Interlude] instrumental breakdown'),
       (24, 0, 9000, '[Bridge] quiet clean guitar'),
       (25, 0, 18000, '[Ambient] sustained pads and quiet chimes'),
       (26, 0, 20000, '[Ambient] slow evolving textures'),
       (27, 0, 15000, '[Ambient] long, drifting tones'),
       (28, 0, 6000, '[Intro] warm rhythm and light guitar'),
       (29, 0, 11000, '[Chorus] uplifting refrain'),
       (30, 0, 12000, '[Outro] reflective outro guitar');

-- 10) PLAYLISTS (10) — оставлены как пользовательские подборки
INSERT INTO playlists (id, owner_id, title, is_public, image_url, created_at)
VALUES (1, '11111111-1111-4111-8111-111111111111', 'Adele Essentials', true,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/adele_essentials_playlist_image.png',
        now() - interval '200 days'),
       (2, '22222222-2222-4222-8222-222222222222', 'Night Drive Hits', true,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/night_drive_playlist_image.png',
        now() - interval '180 days'),
       (3, '33333333-3333-4333-8333-333333333333', 'Blue Jazz', false,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/blue_jazz_playlist_image.png',
        now() - interval '170 days'),
       (4, '44444444-4444-4444-8444-444444444444', 'Rock Classics', true,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/rock_classic_playlist_image.png',
        now() - interval '160 days'),
       (5, '55555555-5555-4555-8555-555555555555', 'Piano Evenings', false,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/piano_evenings_playlist_image.png',
        now() - interval '150 days'),
       (6, '66666666-6666-4666-8666-666666666666', 'Hip-Hop Essentials', true,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/hip-hop_playlist_image.png',
        now() - interval '140 days'),
       (7, '77777777-7777-4777-8777-777777777777', 'Folk Favorites', false,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/folk_playlist_image.png',
        now() - interval '130 days'),
       (8, '88888888-8888-4888-8888-888888888888', 'Metal Anthems', true,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/metal_anthems_playlist_image.png',
        now() - interval '120 days'),
       (9, '99999999-9999-4999-8999-999999999999', 'Ambient Spaces', true,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/ambient_spaces_playlist_image.png',
        now() - interval '110 days'),
       (10, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 'Reggae Roots', true,
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/raggae_roots_playlist_image.png',
        now() - interval '100 days');

-- 11) PLAYLIST_TRACKS (каждый плейлист содержит 3 трека)
INSERT INTO playlist_tracks (playlist_id, track_id)
VALUES (1, 1),
       (1, 2),
       (1, 3),
       (2, 4),
       (2, 5),
       (2, 6),
       (3, 7),
       (3, 8),
       (3, 9),
       (4, 10),
       (4, 11),
       (4, 12),
       (5, 13),
       (5, 14),
       (5, 15),
       (6, 16),
       (6, 17),
       (6, 18),
       (7, 19),
       (7, 20),
       (7, 21),
       (8, 22),
       (8, 23),
       (8, 24),
       (9, 25),
       (9, 26),
       (9, 27),
       (10, 28),
       (10, 29),
       (10, 30);

-- 12) AUTHOR_FOLLOWERS (пример подписчиков)
INSERT INTO author_followers (author_id, follower_id, followed_at)
VALUES ('11111111-1111-4111-8111-111111111111', '22222222-2222-4222-8222-222222222222', now() - interval '10 days'),
       ('11111111-1111-4111-8111-111111111111', '33333333-3333-4333-8333-333333333333', now() - interval '9 days'),
       ('22222222-2222-4222-8222-222222222222', '11111111-1111-4111-8111-111111111111', now() - interval '8 days'),
       ('33333333-3333-4333-8333-333333333333', '44444444-4444-4444-8444-444444444444', now() - interval '7 days'),
       ('44444444-4444-4444-8444-444444444444', '55555555-5555-4555-8555-555555555555', now() - interval '6 days'),
       ('55555555-5555-4555-8555-555555555555', '66666666-6666-4666-8666-666666666666', now() - interval '5 days'),
       ('66666666-6666-4666-8666-666666666666', '77777777-7777-4777-8777-777777777777', now() - interval '4 days'),
       ('77777777-7777-4777-8777-777777777777', '88888888-8888-4888-8888-888888888888', now() - interval '3 days'),
       ('88888888-8888-4888-8888-888888888888', '99999999-9999-4999-8999-999999999999', now() - interval '2 days'),
       ('99999999-9999-4999-8999-999999999999', 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', now() - interval '1 days');

-- 13) USER_FAVORITE_PLAYLISTS & USER_FAVORITE_ALBUMS (примеры)
INSERT INTO user_favorite_playlists (user_id, playlist_id, added_at)
VALUES ('11111111-1111-4111-8111-111111111111', 2, now() - interval '9 days'),
       ('22222222-2222-4222-8222-222222222222', 1, now() - interval '8 days'),
       ('33333333-3333-4333-8333-333333333333', 4, now() - interval '7 days');

INSERT INTO user_favorite_albums (user_id, album_id, added_at)
VALUES ('11111111-1111-4111-8111-111111111111', 2, now() - interval '12 days'),
       ('55555555-5555-4555-8555-555555555555', 5, now() - interval '11 days'),
       ('aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', 10, now() - interval '3 days');

-- 14) TRACK_PLAYS (различные прослушивания — триггер обновит tracks.total_plays)
INSERT INTO track_plays (track_id, user_id, played_at)
VALUES (1, '22222222-2222-4222-8222-222222222222', now() - interval '9 hours'),
       (1, '22222222-2222-4222-8222-222222222222', now() - interval '8 hours'),
       (2, '33333333-3333-4333-8333-333333333333', now() - interval '7 hours'),
       (2, '11111111-1111-4111-8111-111111111111', now() - interval '6 hours'),
       (3, '22222222-2222-4222-8222-222222222222', now() - interval '5 hours'),
       (4, '22222222-2222-4222-8222-222222222222', now() - interval '1 day'),
       (5, '11111111-1111-4111-8111-111111111111', now() - interval '2 days'),
       (6, '22222222-2222-4222-8222-222222222222', now() - interval '3 days'),
       (7, '33333333-3333-4333-8333-333333333333', now() - interval '4 days'),
       (8, '44444444-4444-4444-8444-444444444444', now() - interval '6 days'),
       (9, '22222222-2222-4222-8222-222222222222', now() - interval '7 days'),
       (10, '55555555-5555-4555-8555-555555555555', now() - interval '8 days'),
       (11, '66666666-6666-4666-8666-666666666666', now() - interval '9 days'),
       (12, '22222222-2222-4222-8222-222222222222', now() - interval '10 days'),
       (13, '77777777-7777-4777-8777-777777777777', now() - interval '11 days'),
       (14, '99999999-9999-4999-8999-999999999999', now() - interval '12 days'),
       (15, '22222222-2222-4222-8222-222222222222', now() - interval '13 days'),
       (16, 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa', now() - interval '14 days'),
       (17, '66666666-6666-4666-8666-666666666666', now() - interval '15 days'),
       (18, '22222222-2222-4222-8222-222222222222', now() - interval '16 days'),
       (19, '11111111-1111-4111-8111-111111111111', now() - interval '17 days'),
       (20, '22222222-2222-4222-8222-222222222222', now() - interval '18 days'),
       (21, '22222222-2222-4222-8222-222222222222', now() - interval '19 days'),
       (22, '33333333-3333-4333-8333-333333333333', now() - interval '20 days'),
       (23, '44444444-4444-4444-8444-444444444444', now() - interval '21 days'),
       (24, '44444444-4444-4444-8444-444444444444', now() - interval '22 days'),
       (25, '55555555-5555-4555-8555-555555555555', now() - interval '23 days'),
       (26, '66666666-6666-4666-8666-666666666666', now() - interval '24 days'),
       (27, '44444444-4444-4444-8444-444444444444', now() - interval '25 days'),
       (28, '77777777-7777-4777-8777-777777777777', now() - interval '26 days'),
       (29, '88888888-8888-4888-8888-888888888888', now() - interval '27 days'),
       (30, '44444444-4444-4444-8444-444444444444', now() - interval '28 days');

-- 15) Синхронизация sequence (если явно вставляли id в SERIAL-колонки)
SELECT setval(pg_get_serial_sequence('albums', 'id'), (SELECT MAX(id) FROM albums));
SELECT setval(pg_get_serial_sequence('tracks', 'id'), (SELECT MAX(id) FROM tracks));
SELECT setval(pg_get_serial_sequence('genres', 'id'), (SELECT MAX(id) FROM genres));
SELECT setval(pg_get_serial_sequence('playlists', 'id'), (SELECT MAX(id) FROM playlists));
SELECT setval(pg_get_serial_sequence('subtitles', 'id'), (SELECT MAX(id) FROM subtitles));
