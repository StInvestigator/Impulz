INSERT INTO users (keycloak_id, username, email, avatar_url, created_at)
VALUES ('11111111-1111-4111-8111-111111111112', 'AC/DC', 'ACDC@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/ACDC.jpeg',now() - interval '40 days'),
       ('22222222-2222-4222-8222-222222222223', 'Megadeath', 'Megadeath@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Megadeath.jpeg', now() - interval '38 days'),
       ('33333333-3333-4333-8333-333333333334', 'Queen', 'Queen@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Queen.jpeg', now() - interval '36 days'),
       ('44444444-4444-4444-8444-444444444445', 'Black Sabbath', 'Black_Sabbath@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Black_Sabbath.jpeg', now() - interval '34 days'),
       ('44444444-4444-4444-8444-444444444446', 'Eminem', 'Eminem@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Eminem.jpg', now() - interval '21 days'),
       ('44444444-4444-4444-8444-444444444447', 'Lady Gaga', 'LadyGaga@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Lady_Gaga.jpg', now() - interval '52 days'),
       ('44444444-4444-4444-8444-444444444448', 'Louis Armstrong', 'Louis_Armstrong@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Louis_Armstrong.jpg', now() - interval '12 days'),
       ('44444444-4444-4444-8444-444444444449', 'Beyonce', 'Beyonce@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Beyonce.jpg', now() - interval '20 days'),
       ('44444444-4444-4444-8444-444444444450', '50 Cent', 'FiftyCent@example.com',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/50Cent.jpg', now() - interval '11 days');

INSERT INTO authors (user_id, created_at)
VALUES ('11111111-1111-4111-8111-111111111112',now() - interval '39 days'),
       ('22222222-2222-4222-8222-222222222223',now() - interval '20 days'),
       ('33333333-3333-4333-8333-333333333334',now() - interval '4 days'),
       ('44444444-4444-4444-8444-444444444445',now() - interval '11 days'),
       ('44444444-4444-4444-8444-444444444446', now() - interval '22 days'),
       ('44444444-4444-4444-8444-444444444447', now() - interval '33 days'),
       ('44444444-4444-4444-8444-444444444448', now() - interval '44 days'),
       ('44444444-4444-4444-8444-444444444449', now() - interval '23 days'),
       ('44444444-4444-4444-8444-444444444450', now() - interval '21 days');

INSERT INTO albums (id, title, release_date, image_url, created_at)
VALUES (11, 'We Have All the Time in the World', '1969-01-01', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/we_have_all_the_time_in_the_world.jpg',
        now() - interval '420 days'),
       (12, 'Joanne', '2016-10-21', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Joanne.jpg',
        now() - interval '340 days'),
       (13, 'Louis Wishes You a Cool Yule', '1958-01-01',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/louis_wishes_you_a_cool_yule.jpg',
        now() - interval '290 days'),
       (14, 'The Eminem Show', '2002-05-25',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/the_eminem_show.jpg',
        now() - interval '320 days'),
       (15, 'Encore', '2020-10-05', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Encore.jpg',
        now() - interval '450 days'),
       (16, 'Get Rich Or Die Tryin''', '2003-02-06', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/get_rich_or_die_tryin.jpg',
        now() - interval '200 days'),
       (17, 'The Massacre', '2005-03-03', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/the_massacre.jpg',
        now() - interval '220 days'),
       (18, 'The Fame Monster', '2009-11-18',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/the_fame_monster.jpg',
        now() - interval '160 days'),
       (19, 'Dangerously In Love', '2003-05-22',
        'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/dangerously_in_love.jpg',
        now() - interval '140 days'),
       (20, 'Lemonade', '2016-04-23', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Lemonade.jpg',
        now() - interval '280 days'),
       (21, 'Paranoid', '1970-09-18', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/Paranoid.jpg',
        now() - interval '240 days'),
       (22, 'Black Sabbath', '1970-02-13', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/black_sabbath.jpg',
        now() - interval '220 days'),
       (23, 'News Of The World', '1977-10-28', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/news_of_the_world.jpg',
        now() - interval '210 days'),
       (24, 'The Game', '1980-05-30', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/the_game.jpg',
        now() - interval '215 days'),
       (25, 'Peace Sells... But Who''s Buying', '1986-01-01', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/peace_sells_but_whos_buying.jpg',
        now() - interval '195 days'),
       (26, 'Rust In Peace', '1990-09-24', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/rust_in_peace.jpg',
        now() - interval '180 days'),
       (27, 'Back In Black', '1980-06-25', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/back_in_black.jpg',
        now() - interval '150 days'),
       (28, 'Highway To Hell', '1979-06-27', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/highway_to_hell.jpg',
        now() - interval '155 days'),
       (29, 'The Razors Edge', '1990-09-24', 'https://impulz-bucket-1.s3.us-east-1.amazonaws.com/image/the_razors_edge.jpg',
        now() - interval '110 days');

INSERT INTO album_authors (album_id, author_id)
VALUES  (11, '44444444-4444-4444-8444-444444444448'),
        (12, '44444444-4444-4444-8444-444444444447'),
        (13, '44444444-4444-4444-8444-444444444448'),
        (14, '44444444-4444-4444-8444-444444444446'),
        (15, '44444444-4444-4444-8444-444444444446'),
        (16, '44444444-4444-4444-8444-444444444450'),
        (17, '44444444-4444-4444-8444-444444444450'),
        (18, '44444444-4444-4444-8444-444444444447'),
        (19, '44444444-4444-4444-8444-444444444449'),
        (20, '44444444-4444-4444-8444-444444444449'),
        (21, '44444444-4444-4444-8444-444444444445'),
        (22, '44444444-4444-4444-8444-444444444445'),
        (23, '33333333-3333-4333-8333-333333333334'),
        (24, '33333333-3333-4333-8333-333333333334'),
        (25, '22222222-2222-4222-8222-222222222223'),
        (26, '22222222-2222-4222-8222-222222222223'),
        (27, '11111111-1111-4111-8111-111111111112'),
        (28, '11111111-1111-4111-8111-111111111112'),
        (29, '11111111-1111-4111-8111-111111111112');

INSERT INTO tracks (id, album_id, title, duration_sec, file_url, likes, created_at)
VALUES
-- The Razors Edge (AC/DC) - Album ID: 29
(31, 29, 'Thunderstruck', 292, 'music/ACDC_-_Thunderstruck_47830044.mp3', 2500, now() - interval '105 days'),
(32, 29, 'The Razors Edge', 254, 'music/ACDC_-_The_Razors_Edge_47830054.mp3', 1800, now() - interval '104 days'),
(33, 29, 'Moneytalks', 228, 'music/ACDC_-_Moneytalks_48123059.mp3', 1600, now() - interval '103 days'),
(34, 29, 'If You Dare', 208, 'music/ACDC_-_If_You_Dare_48123076.mp3', 1200, now() - interval '102 days'),
(35, 29, 'Fire Your Guns', 178, 'music/ACDC_-_Fire_Your_Guns_48123058.mp3', 1400, now() - interval '101 days'),
(36, 29, 'Are You Ready', 262, 'music/ACDC_-_Are_You_Ready_48123064.mp3', 1500, now() - interval '100 days'),

-- Highway To Hell (AC/DC) - Album ID: 28
(37, 28, 'Touch Too Much', 268, 'music/ACDC_-_Touch_Too_Much_47950959.mp3', 2200, now() - interval '150 days'),
(38, 28, 'Love Hungry Man', 258, 'music/ACDC_-_Love_Hungry_Man_48136459.mp3', 1300, now() - interval '149 days'),
(39, 28, 'Highway to Hell', 208, 'music/ACDC_-_Highway_to_Hell_47830059.mp3', 4500, now() - interval '148 days'),
(40, 28, 'Girls Got Rhythm', 214, 'music/ACDC_-_Girls_Got_Rhythm_48136447.mp3', 1700, now() - interval '147 days'),
(41, 28, 'Get It Hot', 190, 'music/ACDC_-_Get_It_Hot_48136458.mp3', 1200, now() - interval '146 days'),

-- Back In Black (AC/DC) - Album ID: 27
(42, 27, 'You Shook Me All Night Long', 210, 'music/ACDC_-_You_Shook_Me_All_Night_Long_47852345.mp3', 3800, now() - interval '145 days'),
(43, 27, 'Shoot to Thrill', 312, 'music/ACDC_-_Shoot_to_Thrill_47830035.mp3', 2200, now() - interval '144 days'),
(44, 27, 'Let Me Put My Love Into You', 256, 'music/ACDC_-_Let_Me_Put_My_Love_Into_You_47852342.mp3', 1500, now() - interval '143 days'),
(45, 27, 'Hells Bells', 312, 'music/ACDC_-_Hells_Bells_47852336.mp3', 2800, now() - interval '142 days'),
(46, 27, 'Back In Black', 255, 'music/ACDC_-_Back_In_Black_47830042.mp3', 4200, now() - interval '141 days'),

-- Rust In Peace (Megadeth) - Album ID: 26
(47, 26, 'Take No Prisoners', 193, 'music/Megadeth_-_Take_No_Prisoners_47891515.mp3', 1800, now() - interval '175 days'),
(48, 26, 'Rust In Peace... Polaris', 326, 'music/Megadeth_-_Rust_In_PeacePolaris_47891507.mp3', 2100, now() - interval '174 days'),
(49, 26, 'My Creation', 120, 'music/Megadeth_-_My_Creation_47891508.mp3', 900, now() - interval '173 days'),
(50, 26, 'Holy Wars... The Punishment Due', 386, 'music/Megadeth_-_Holy_WarsThe_Punishment_Due_47891244.mp3', 3200, now() - interval '172 days'),
(51, 26, 'Hangar 18', 308, 'music/Megadeth_-_Hangar_18_47891246.mp3', 2500, now() - interval '171 days'),
(52, 26, 'Dawn Patrol', 112, 'music/Megadeth_-_Dawn_Patrol_47891506.mp3', 800, now() - interval '170 days'),

-- Peace Sells But Who's Buying (Megadeth) - Album ID: 25
(53, 25, 'Wake Up Dead', 208, 'music/Megadeth_-_Wake_Up_Dead_47892619.mp3', 1900, now() - interval '190 days'),
(54, 25, 'Peace Sells', 286, 'music/Megadeth_-_Peace_Sells_47892621.mp3', 2300, now() - interval '189 days'),
(55, 25, 'My Last Words', 291, 'music/Megadeth_-_My_Last_Words_47892632.mp3', 1200, now() - interval '188 days'),
(56, 25, 'Good Mourning/Black Friday', 390, 'music/Megadeth_-_Good_Mourning_Black_Friday_47892626.mp3', 1800, now() - interval '187 days'),
(57, 25, 'Devils Island', 302, 'music/Megadeth_-_Devils_Island_47892622.mp3', 1400, now() - interval '186 days'),

-- The Game (Queen) - Album ID: 24
(58, 24, 'Save Me', 228, 'music/Queen_-_Save_Me_47828503.mp3', 2100, now() - interval '210 days'),
(59, 24, 'Play The Game', 216, 'music/Queen_-_Play_The_Game_47828508.mp3', 1800, now() - interval '209 days'),
(60, 24, 'It''s A Beautiful Day', 175, 'music/Queen_-_Its_A_Beautiful_Day_48056398.mp3', 1200, now() - interval '208 days'),
(61, 24, 'Don''t Try Suicide', 213, 'music/Queen_-_Dont_Try_Suicide_48056388.mp3', 900, now() - interval '207 days'),
(62, 24, 'Coming Soon', 128, 'music/Queen_-_Coming_Soon_48056390.mp3', 800, now() - interval '206 days'),
(63, 24, 'Another One Bites The Dust', 215, 'music/Queen_-_Another_One_Bites_The_Dust_47828496.mp3', 4500, now() - interval '205 days'),

-- News Of The World (Queen) - Album ID: 23
(64, 23, 'Feelings Feelings', 195, 'music/Queen_-_Feelings_Feelings_47851914.mp3', 1100, now() - interval '204 days'),
(65, 23, 'It''s Late', 386, 'music/Queen_-_Its_Late_47851912.mp3', 1900, now() - interval '203 days'),
(66, 23, 'Sleeping On The Sidewalk', 187, 'music/Queen_-_Sleeping_On_The_Sidewalk_47851909.mp3', 1000, now() - interval '202 days'),
(67, 23, 'We Are The Champions', 180, 'music/Queen_-_We_Are_The_Champions_47828513.mp3', 5200, now() - interval '201 days'),
(68, 23, 'We Will Rock You', 122, 'music/Queen_-_We_Will_Rock_You_47828511.mp3', 4800, now() - interval '200 days'),
(69, 23, 'Who Needs You', 187, 'music/Queen_-_Who_Needs_You_47851911.mp3', 950, now() - interval '199 days'),

-- Black Sabbath (Black Sabbath) - Album ID: 22
(70, 22, 'Warning', 468, 'music/Black_Sabbath_-_Warning_47874622.mp3', 1600, now() - interval '215 days'),
(71, 22, 'N.I.B.', 368, 'music/Black_Sabbath_-_NIB_47874645.mp3', 2200, now() - interval '214 days'),
(72, 22, 'Evil Woman', 203, 'music/Black_Sabbath_-_Evil_Woman_59500597.mp3', 1200, now() - interval '213 days'),
(73, 22, 'Black Sabbath', 418, 'music/Black_Sabbath_-_Black_Sabbath_47874619.mp3', 2800, now() - interval '212 days'),
(74, 22, 'Behind The Wall Of Sleep', 228, 'music/Black_Sabbath_-_Behind_The_Wall_Of_Sleep_47955984.mp3', 1400, now() - interval '211 days'),

-- Paranoid (Black Sabbath) - Album ID: 21
(75, 21, 'War Pigs', 478, 'music/Black_Sabbath_-_War_Pigs_59446505.mp3', 3200, now() - interval '235 days'),
(76, 21, 'Rat Salad', 145, 'music/Black_Sabbath_-_Rat_Salad_47874738.mp3', 800, now() - interval '234 days'),
(77, 21, 'Paranoid', 168, 'music/Black_Sabbath_-_Paranoid_47874623.mp3', 3800, now() - interval '233 days'),
(78, 21, 'Iron Man', 348, 'music/Black_Sabbath_-_Iron_Man_47874627.mp3', 4200, now() - interval '232 days'),
(79, 21, 'Hand Of Doom', 428, 'music/Black_Sabbath_-_Hand_Of_Doom_47874736.mp3', 1900, now() - interval '231 days'),
(80, 21, 'Electric Funeral', 285, 'music/Black_Sabbath_-_Electric_Funeral_47874734.mp3', 1500, now() - interval '230 days'),

-- Lemonade (Beyonce) - Album ID: 20
(81, 20, '6 Inch', 239, 'music/Beyonc_The_Weeknd_-_6_Inch_64492573.mp3', 2800, now() - interval '275 days'),
(82, 20, 'Freedom', 296, 'music/Beyonc_Kendrick_Lamar_-_Freedom_64492580.mp3', 3200, now() - interval '274 days'),
(83, 20, 'Sorry', 253, 'music/Beyonc_-_Sorry_64492589.mp3', 3800, now() - interval '273 days'),
(84, 20, 'Sandcastles', 226, 'music/Beyonc_-_Sandcastles_64492577.mp3', 2100, now() - interval '272 days'),
(85, 20, 'Love Drought', 221, 'music/Beyonc_-_Love_Drought_64492575.mp3', 1800, now() - interval '271 days'),
(86, 20, 'Formation', 226, 'music/Beyonc_-_Formation_64492586.mp3', 3500, now() - interval '270 days'),
(87, 20, 'All Night', 353, 'music/Beyonc_-_All_Night_64492583.mp3', 2900, now() - interval '269 days'),

-- Dangerously In Love (Beyonce) - Album ID: 19
(88, 19, 'Yes', 259, 'music/Beyonc_-_Yes_48055087.mp3', 1600, now() - interval '135 days'),
(89, 19, 'Work It Out', 238, 'music/Beyonc_-_Work_It_Out_48055099.mp3', 1400, now() - interval '134 days'),
(90, 19, 'Naughty Girl', 208, 'music/Beyonc_-_Naughty_Girl_48055078.mp3', 3200, now() - interval '133 days'),
(91, 19, 'Hip Hop Star', 268, 'music/Beyonc_-_Hip_Hop_Star_48055081.mp3', 1200, now() - interval '132 days'),
(92, 19, 'Gift from Virgo', 174, 'music/Beyonc_-_Gift_from_Virgo_48055097.mp3', 900, now() - interval '131 days'),
(93, 19, 'Be With You', 258, 'music/Beyonc_-_Be_With_You_48055083.mp3', 1100, now() - interval '130 days'),

-- The Fame Monster (Lady Gaga) - Album ID: 18
(94, 18, 'The Fame', 221, 'music/Lady_Gaga_-_The_Fame_47836186.mp3', 1800, now() - interval '155 days'),
(95, 18, 'Speechless', 268, 'music/Lady_Gaga_-_Speechless_47836170.mp3', 2200, now() - interval '154 days'),
(96, 18, 'Poker Face', 238, 'music/Lady_Gaga_-_Poker_Face_47836180.mp3', 5200, now() - interval '153 days'),
(97, 18, 'Paper Gangsta', 285, 'music/Lady_Gaga_-_Paper_Gangsta_47836189.mp3', 1300, now() - interval '152 days'),
(98, 18, 'Monster', 248, 'music/Lady_Gaga_-_Monster_47836169.mp3', 1900, now() - interval '151 days'),
(99, 18, 'Money Honey', 175, 'music/Lady_Gaga_-_Money_Honey_47836187.mp3', 1100, now() - interval '150 days'),
(100, 18, 'Dance In The Dark', 289, 'music/Lady_Gaga_-_Dance_In_The_Dark_47836171.mp3', 2100, now() - interval '149 days'),
(101, 18, 'Boys Boys Boys', 203, 'music/Lady_Gaga_-_Boys_Boys_Boys_47836188.mp3', 1400, now() - interval '148 days'),

-- The Massacre (50 Cent) - Album ID: 17
(102, 17, 'My Toy Soldier', 241, 'music/50_Cent_Tony_Yayo_-_My_Toy_Soldier_51288010.mp3', 1200, now() - interval '215 days'),
(103, 17, 'So Amazing', 208, 'music/50_Cent_Olivia_-_So_Amazing_51288018.mp3', 1100, now() - interval '214 days'),
(104, 17, 'Build You Up', 196, 'music/50_Cent_Jamie_Foxx_-_Build_You_Up_51288014.mp3', 900, now() - interval '213 days'),
(105, 17, 'This Is 50', 185, 'music/50_Cent_-_This_Is_50_51287998.mp3', 1500, now() - interval '212 days'),
(106, 17, 'Piggy Bank', 249, 'music/50_Cent_-_Piggy_Bank_51288001.mp3', 1800, now() - interval '211 days'),
(107, 17, 'In My Hood', 213, 'music/50_Cent_-_In_My_Hood_51287995.mp3', 1300, now() - interval '210 days'),
(108, 17, 'I Don''t Need ''Em', 231, 'music/50_Cent_-_I_Dont_Need_Em_51288020.mp3', 1000, now() - interval '209 days'),
(109, 17, 'A Baltimore Love Thing', 284, 'music/50_Cent_-_A_Baltimore_Love_Thing_51288007.mp3', 800, now() - interval '208 days'),

-- Get Rich Or Die Tryin' (50 Cent) - Album ID: 16
(110, 16, 'Patiently Waiting', 294, 'music/50_Cent_Eminem_-_Patiently_Waiting_50968873.mp3', 2200, now() - interval '195 days'),
(111, 16, 'What Up Gangsta', 175, 'music/50_Cent_-_What_Up_Gangsta_50968872.mp3', 1900, now() - interval '194 days'),
(112, 16, 'U Not Like Me', 258, 'music/50_Cent_-_U_Not_Like_Me_50968884.mp3', 1600, now() - interval '193 days'),
(113, 16, 'Poor Lil Rich', 301, 'music/50_Cent_-_Poor_Lil_Rich_50968880.mp3', 1300, now() - interval '192 days'),
(114, 16, 'Life''s On The Line', 269, 'music/50_Cent_-_Lifes_On_The_Line_50968885.mp3', 1400, now() - interval '191 days'),
(115, 16, 'If I Can''t', 265, 'music/50_Cent_-_If_I_Cant_50968876.mp3', 1700, now() - interval '190 days'),
(116, 16, 'Gotta Make It To Heaven', 243, 'music/50_Cent_-_Gotta_Make_It_To_Heaven_50968883.mp3', 1100, now() - interval '189 days'),
(117, 16, 'Back Down', 285, 'music/50_Cent_-_Back_Down_50968878.mp3', 1500, now() - interval '188 days'),

-- Encore (Eminem) - Album ID: 15
(118, 15, 'Never Enough', 158, 'music/Eminem_50_Cent_Nate_Dogg_-_Never_Enough_47965625.mp3', 2100, now() - interval '445 days'),
(119, 15, 'Puke', 261, 'music/Eminem_-_Puke_47965631.mp3', 1300, now() - interval '444 days'),
(120, 15, 'Paul', 34, 'music/Eminem_-_Paul_47965635.mp3', 800, now() - interval '443 days'),
(121, 15, 'My 1st Single', 300, 'music/Eminem_-_My_1st_Single_47965633.mp3', 1200, now() - interval '442 days'),
(122, 15, 'Mosh', 317, 'music/Eminem_-_Mosh_47965630.mp3', 1900, now() - interval '441 days'),
(123, 15, 'Final Thought', 39, 'music/Eminem_-_Final_Thought_47965649.mp3', 700, now() - interval '440 days'),
(124, 15, 'Evil Deeds', 269, 'music/Eminem_-_Evil_Deeds_47965623.mp3', 1400, now() - interval '439 days'),
(125, 15, 'Crazy In Love', 272, 'music/Eminem_-_Crazy_In_Love_47965645.mp3', 1100, now() - interval '438 days'),
(126, 15, 'Big Weenie', 267, 'music/Eminem_-_Big_Weenie_47965639.mp3', 1000, now() - interval '437 days'),

-- The Eminem Show (Eminem) - Album ID: 14
(127, 14, 'Drips', 284, 'music/Eminem_Obie_Trice_-_Drips_48381339.mp3', 1200, now() - interval '315 days'),
(128, 14, 'Till I Collapse', 297, 'music/Eminem_Nate_Dogg_-_Till_I_Collapse_48381358.mp3', 3500, now() - interval '314 days'),
(129, 14, 'My Dad''s Gone Crazy', 267, 'music/Eminem_Hailie_Jade_-_My_Dads_Gone_Crazy_48381361.mp3', 1800, now() - interval '313 days'),
(130, 14, 'Without Me', 290, 'music/Eminem_-_Without_Me_47829431.mp3', 4800, now() - interval '312 days'),
(131, 14, 'The Kiss', 76, 'music/Eminem_-_The_Kiss_48381334.mp3', 900, now() - interval '311 days'),
(132, 14, 'Square Dance', 324, 'music/Eminem_-_Square_Dance_48381332.mp3', 1400, now() - interval '310 days'),
(133, 14, 'Sing For The Moment', 339, 'music/Eminem_-_Sing_For_The_Moment_47829430.mp3', 2900, now() - interval '309 days'),
(134, 14, 'Paul Rosenberg', 23, 'music/Eminem_-_Paul_Rosenberg_48381341.mp3', 600, now() - interval '308 days'),
(135, 14, 'Hailie''s Song', 320, 'music/Eminem_-_Hailies_Song_48381349.mp3', 2200, now() - interval '307 days'),

-- Louis Wishes You a Cool Yule (Louis Armstrong) - Album ID: 13
(136, 13, 'Baby It''s Cold Outside', 178, 'music/Louis_Armstrong_Velma_Middleton_-_Baby_Its_Cold_Outside_73408929.mp3', 1600, now() - interval '285 days'),
(137, 13, 'Cool Yule', 156, 'music/Louis_Armstrong_Toots_Camarata_-_Cool_Yule_48241049.mp3', 1400, now() - interval '284 days'),
(138, 13, 'Winter Wonderland', 132, 'music/Louis_Armstrong_-_Winter_Wonderland_48241073.mp3', 1800, now() - interval '283 days'),
(139, 13, 'Christmas Night In Harlem', 148, 'music/Louis_Armstrong_-_Christmas_Night_In_Harlem_48241040.mp3', 1200, now() - interval '282 days'),

-- Joanne (Lady Gaga) - Album ID: 12
(140, 12, 'Perfect Illusion', 179, 'music/Lady_Gaga_-_Perfect_Illusion_48198470.mp3', 2800, now() - interval '335 days'),
(141, 12, 'Just Another Day', 169, 'music/Lady_Gaga_-_Just_Another_Day_48198485.mp3', 1500, now() - interval '334 days'),
(142, 12, 'Joanne', 193, 'music/Lady_Gaga_-_Joanne_48198462.mp3', 3200, now() - interval '333 days'),
(143, 12, 'Grigio Girls', 223, 'music/Lady_Gaga_-_Grigio_Girls_48198483.mp3', 1300, now() - interval '332 days'),
(144, 12, 'Dancin'' In Circles', 224, 'music/Lady_Gaga_-_Dancin_In_Circles_48198468.mp3', 1700, now() - interval '331 days'),
(145, 12, 'Come To Mama', 257, 'music/Lady_Gaga_-_Come_To_Mama_48198476.mp3', 1200, now() - interval '330 days'),
(146, 12, 'Angel Down', 179, 'music/Lady_Gaga_-_Angel_Down_48198480.mp3', 1100, now() - interval '329 days'),

-- We Have All the Time in the World (Louis Armstrong) - Album ID: 11
(147, 11, 'Tin Roof Blues', 182, 'music/Louis_Armstrong_-_Tin_Roof_Blues_47937294.mp3', 900, now() - interval '415 days'),
(148, 11, 'We Have All The Time in the World', 193, 'music/Louis_Armstrong_-_We_Have_all_The_Time_in_the_World_58065774.mp3', 2500, now() - interval '414 days'),
(149, 11, 'What A Wonderful World', 139, 'music/Louis_Armstrong_-_What_A_Wonderful_World_47937264.mp3', 4200, now() - interval '413 days'),
(150, 11, 'Fantastic That''s You', 156, 'music/Louis_Armstrong_-_Fantastic_Thats_You_47937317.mp3', 800, now() - interval '412 days'),
(151, 11, 'Mame', 187, 'music/Louis_Armstrong_-_Mame_47937288.mp3', 700, now() - interval '411 days'),
(152, 11, 'Moon River', 168, 'music/Louis_Armstrong_-_Moon_River_47937261.mp3', 1900, now() - interval '410 days'),
(153, 11, 'Short But Sweet', 145, 'music/Louis_Armstrong_-_Short_But_Sweet_47937304.mp3', 600, now() - interval '409 days'),
(154, 11, 'The Circle Of Your Arms', 162, 'music/Louis_Armstrong_-_The_Circle_Of_Your_Arms_47937290.mp3', 750, now() - interval '408 days');


-- Исправленные track_authors с правильными ID треков
INSERT INTO track_authors (track_id, author_id)
VALUES
-- AC/DC треки (The Razors Edge, Highway To Hell, Back In Black)
(31, '11111111-1111-4111-8111-111111111112'),
(32, '11111111-1111-4111-8111-111111111112'),
(33, '11111111-1111-4111-8111-111111111112'),
(34, '11111111-1111-4111-8111-111111111112'),
(35, '11111111-1111-4111-8111-111111111112'),
(36, '11111111-1111-4111-8111-111111111112'),
(37, '11111111-1111-4111-8111-111111111112'),
(38, '11111111-1111-4111-8111-111111111112'),
(39, '11111111-1111-4111-8111-111111111112'),
(40, '11111111-1111-4111-8111-111111111112'),
(41, '11111111-1111-4111-8111-111111111112'),
(42, '11111111-1111-4111-8111-111111111112'),
(43, '11111111-1111-4111-8111-111111111112'),
(44, '11111111-1111-4111-8111-111111111112'),
(45, '11111111-1111-4111-8111-111111111112'),
(46, '11111111-1111-4111-8111-111111111112'),

-- Megadeth треки (Rust In Peace, Peace Sells)
(47, '22222222-2222-4222-8222-222222222223'),
(48, '22222222-2222-4222-8222-222222222223'),
(49, '22222222-2222-4222-8222-222222222223'),
(50, '22222222-2222-4222-8222-222222222223'),
(51, '22222222-2222-4222-8222-222222222223'),
(52, '22222222-2222-4222-8222-222222222223'),
(53, '22222222-2222-4222-8222-222222222223'),
(54, '22222222-2222-4222-8222-222222222223'),
(55, '22222222-2222-4222-8222-222222222223'),
(56, '22222222-2222-4222-8222-222222222223'),
(57, '22222222-2222-4222-8222-222222222223'),

-- Queen треки (The Game, News Of The World)
(58, '33333333-3333-4333-8333-333333333334'),
(59, '33333333-3333-4333-8333-333333333334'),
(60, '33333333-3333-4333-8333-333333333334'),
(61, '33333333-3333-4333-8333-333333333334'),
(62, '33333333-3333-4333-8333-333333333334'),
(63, '33333333-3333-4333-8333-333333333334'),
(64, '33333333-3333-4333-8333-333333333334'),
(65, '33333333-3333-4333-8333-333333333334'),
(66, '33333333-3333-4333-8333-333333333334'),
(67, '33333333-3333-4333-8333-333333333334'),
(68, '33333333-3333-4333-8333-333333333334'),
(69, '33333333-3333-4333-8333-333333333334'),

-- Black Sabbath треки (Black Sabbath, Paranoid)
(70, '44444444-4444-4444-8444-444444444445'),
(71, '44444444-4444-4444-8444-444444444445'),
(72, '44444444-4444-4444-8444-444444444445'),
(73, '44444444-4444-4444-8444-444444444445'),
(74, '44444444-4444-4444-8444-444444444445'),
(75, '44444444-4444-4444-8444-444444444445'),
(76, '44444444-4444-4444-8444-444444444445'),
(77, '44444444-4444-4444-8444-444444444445'),
(78, '44444444-4444-4444-8444-444444444445'),
(79, '44444444-4444-4444-8444-444444444445'),
(80, '44444444-4444-4444-8444-444444444445'),

-- Eminem треки (The Eminem Show, Encore)
(118, '44444444-4444-4444-8444-444444444446'),
(119, '44444444-4444-4444-8444-444444444446'),
(120, '44444444-4444-4444-8444-444444444446'),
(121, '44444444-4444-4444-8444-444444444446'),
(122, '44444444-4444-4444-8444-444444444446'),
(123, '44444444-4444-4444-8444-444444444446'),
(124, '44444444-4444-4444-8444-444444444446'),
(125, '44444444-4444-4444-8444-444444444446'),
(126, '44444444-4444-4444-8444-444444444446'),
(127, '44444444-4444-4444-8444-444444444446'),
(128, '44444444-4444-4444-8444-444444444446'),
(129, '44444444-4444-4444-8444-444444444446'),
(130, '44444444-4444-4444-8444-444444444446'),
(131, '44444444-4444-4444-8444-444444444446'),
(132, '44444444-4444-4444-8444-444444444446'),
(133, '44444444-4444-4444-8444-444444444446'),
(134, '44444444-4444-4444-8444-444444444446'),
(135, '44444444-4444-4444-8444-444444444446'),

-- Lady Gaga треки (The Fame Monster, Joanne)
(94, '44444444-4444-4444-8444-444444444447'),
(95, '44444444-4444-4444-8444-444444444447'),
(96, '44444444-4444-4444-8444-444444444447'),
(97, '44444444-4444-4444-8444-444444444447'),
(98, '44444444-4444-4444-8444-444444444447'),
(99, '44444444-4444-4444-8444-444444444447'),
(100, '44444444-4444-4444-8444-444444444447'),
(101, '44444444-4444-4444-8444-444444444447'),
(140, '44444444-4444-4444-8444-444444444447'),
(141, '44444444-4444-4444-8444-444444444447'),
(142, '44444444-4444-4444-8444-444444444447'),
(143, '44444444-4444-4444-8444-444444444447'),
(144, '44444444-4444-4444-8444-444444444447'),
(145, '44444444-4444-4444-8444-444444444447'),
(146, '44444444-4444-4444-8444-444444444447'),

-- Louis Armstrong треки (Louis Wishes You a Cool Yule, We Have All the Time in the World)
(136, '44444444-4444-4444-8444-444444444448'),
(137, '44444444-4444-4444-8444-444444444448'),
(138, '44444444-4444-4444-8444-444444444448'),
(139, '44444444-4444-4444-8444-444444444448'),
(147, '44444444-4444-4444-8444-444444444448'),
(148, '44444444-4444-4444-8444-444444444448'),
(149, '44444444-4444-4444-8444-444444444448'),
(150, '44444444-4444-4444-8444-444444444448'),
(151, '44444444-4444-4444-8444-444444444448'),
(152, '44444444-4444-4444-8444-444444444448'),
(153, '44444444-4444-4444-8444-444444444448'),
(154, '44444444-4444-4444-8444-444444444448'),

-- Beyonce треки (Lemonade, Dangerously In Love)
(81, '44444444-4444-4444-8444-444444444449'),
(82, '44444444-4444-4444-8444-444444444449'),
(83, '44444444-4444-4444-8444-444444444449'),
(84, '44444444-4444-4444-8444-444444444449'),
(85, '44444444-4444-4444-8444-444444444449'),
(86, '44444444-4444-4444-8444-444444444449'),
(87, '44444444-4444-4444-8444-444444444449'),
(88, '44444444-4444-4444-8444-444444444449'),
(89, '44444444-4444-4444-8444-444444444449'),
(90, '44444444-4444-4444-8444-444444444449'),
(91, '44444444-4444-4444-8444-444444444449'),
(92, '44444444-4444-4444-8444-444444444449'),
(93, '44444444-4444-4444-8444-444444444449'),

-- 50 Cent треки (The Massacre, Get Rich Or Die Tryin')
(102, '44444444-4444-4444-8444-444444444450'),
(103, '44444444-4444-4444-8444-444444444450'),
(104, '44444444-4444-4444-8444-444444444450'),
(105, '44444444-4444-4444-8444-444444444450'),
(106, '44444444-4444-4444-8444-444444444450'),
(107, '44444444-4444-4444-8444-444444444450'),
(108, '44444444-4444-4444-8444-444444444450'),
(109, '44444444-4444-4444-8444-444444444450'),
(110, '44444444-4444-4444-8444-444444444450'),
(111, '44444444-4444-4444-8444-444444444450'),
(112, '44444444-4444-4444-8444-444444444450'),
(113, '44444444-4444-4444-8444-444444444450'),
(114, '44444444-4444-4444-8444-444444444450'),
(115, '44444444-4444-4444-8444-444444444450'),
(116, '44444444-4444-4444-8444-444444444450'),
(117, '44444444-4444-4444-8444-444444444450');


INSERT INTO track_genres (track_id, genre_id)
VALUES
-- AC/DC (Rock/Metal)
(31, 2), (31, 8),   -- Thunderstruck (Rock/Metal)
(32, 2), (32, 8),   -- The Razors Edge (Rock/Metal)
(33, 2),            -- Moneytalks (Rock)
(34, 2), (34, 8),   -- If You Dare (Rock/Metal)
(35, 2), (35, 8),   -- Fire Your Guns (Rock/Metal)
(36, 2),            -- Are You Ready (Rock)
(37, 2),            -- Touch Too Much (Rock)
(38, 2),            -- Love Hungry Man (Rock)
(39, 2), (39, 8),   -- Highway to Hell (Rock/Metal)
(40, 2),            -- Girls Got Rhythm (Rock)
(41, 2),            -- Get It Hot (Rock)
(42, 2),            -- You Shook Me All Night Long (Rock)
(43, 2), (43, 8),   -- Shoot to Thrill (Rock/Metal)
(44, 2),            -- Let Me Put My Love Into You (Rock)
(45, 2), (45, 8),   -- Hells Bells (Rock/Metal)
(46, 2), (46, 8),   -- Back In Black (Rock/Metal)

-- Megadeth (Metal)
(47, 8), (47, 2),   -- Take No Prisoners (Metal/Rock)
(48, 8), (48, 2),   -- Rust In Peace... Polaris (Metal/Rock)
(49, 8),            -- My Creation (Metal)
(50, 8), (50, 2),   -- Holy Wars... The Punishment Due (Metal/Rock)
(51, 8), (51, 2),   -- Hangar 18 (Metal/Rock)
(52, 8),            -- Dawn Patrol (Metal)
(53, 8), (53, 2),   -- Wake Up Dead (Metal/Rock)
(54, 8), (54, 2),   -- Peace Sells (Metal/Rock)
(55, 8),            -- My Last Words (Metal)
(56, 8), (56, 2),   -- Good Mourning/Black Friday (Metal/Rock)
(57, 8), (57, 2),   -- Devils Island (Metal/Rock)

-- Queen (Rock)
(58, 2),            -- Save Me (Rock)
(59, 2),            -- Play The Game (Rock)
(60, 2), (60, 1),   -- It's A Beautiful Day (Rock/Pop)
(61, 2),            -- Don't Try Suicide (Rock)
(62, 2),            -- Coming Soon (Rock)
(63, 2), (63, 6),   -- Another One Bites The Dust (Rock/Hip-Hop)
(64, 2),            -- Feelings Feelings (Rock)
(65, 2),            -- It's Late (Rock)
(66, 2),            -- Sleeping On The Sidewalk (Rock)
(67, 2), (67, 1),   -- We Are The Champions (Rock/Pop)
(68, 2), (68, 1),   -- We Will Rock You (Rock/Pop)
(69, 2),            -- Who Needs You (Rock)

-- Black Sabbath (Metal/Rock)
(70, 8), (70, 2),   -- Warning (Metal/Rock)
(71, 8), (71, 2),   -- N.I.B. (Metal/Rock)
(72, 8), (72, 2),   -- Evil Woman (Metal/Rock)
(73, 8), (73, 2),   -- Black Sabbath (Metal/Rock)
(74, 8), (74, 2),   -- Behind The Wall Of Sleep (Metal/Rock)
(75, 8), (75, 2),   -- War Pigs (Metal/Rock)
(76, 8), (76, 2),   -- Rat Salad (Metal/Rock)
(77, 8), (77, 2),   -- Paranoid (Metal/Rock)
(78, 8), (78, 2),   -- Iron Man (Metal/Rock)
(79, 8), (79, 2),   -- Hand Of Doom (Metal/Rock)
(80, 8), (80, 2),   -- Electric Funeral (Metal/Rock)

-- Beyonce (Pop/R&B)
(81, 1), (81, 6),   -- 6 Inch (Pop/Hip-Hop)
(82, 1), (82, 6),   -- Freedom (Pop/Hip-Hop)
(83, 1),            -- Sorry (Pop)
(84, 1),            -- Sandcastles (Pop)
(85, 1),            -- Love Drought (Pop)
(86, 1), (86, 6),   -- Formation (Pop/Hip-Hop)
(87, 1),            -- All Night (Pop)
(88, 1),            -- Yes (Pop)
(89, 1),            -- Work It Out (Pop)
(90, 1), (90, 6),   -- Naughty Girl (Pop/Hip-Hop)
(91, 1), (91, 6),   -- Hip Hop Star (Pop/Hip-Hop)
(92, 1),            -- Gift from Virgo (Pop)
(93, 1),            -- Be With You (Pop)

-- Lady Gaga (Pop/Electronic)
(94, 1), (94, 5),   -- The Fame (Pop/Electronic)
(95, 1),            -- Speechless (Pop)
(96, 1), (96, 5),   -- Poker Face (Pop/Electronic)
(97, 1), (97, 5),   -- Paper Gangsta (Pop/Electronic)
(98, 1), (98, 5),   -- Monster (Pop/Electronic)
(99, 1), (99, 5),   -- Money Honey (Pop/Electronic)
(100, 1), (100, 5), -- Dance In The Dark (Pop/Electronic)
(101, 1), (101, 5), -- Boys Boys Boys (Pop/Electronic)
(140, 1),           -- Perfect Illusion (Pop)
(141, 1),           -- Just Another Day (Pop)
(142, 1),           -- Joanne (Pop)
(143, 1),           -- Grigio Girls (Pop)
(144, 1), (144, 5), -- Dancin' In Circles (Pop/Electronic)
(145, 1),           -- Come To Mama (Pop)
(146, 1),           -- Angel Down (Pop)

-- 50 Cent (Hip-Hop/Rap)
(102, 6), (102, 11), -- My Toy Soldier (Hip-Hop/Rap)
(103, 6), (103, 11), -- So Amazing (Hip-Hop/Rap)
(104, 6), (104, 11), -- Build You Up (Hip-Hop/Rap)
(105, 6), (105, 11), -- This Is 50 (Hip-Hop/Rap)
(106, 6), (106, 11), -- Piggy Bank (Hip-Hop/Rap)
(107, 6), (107, 11), -- In My Hood (Hip-Hop/Rap)
(108, 6), (108, 11), -- I Don't Need 'Em (Hip-Hop/Rap)
(109, 6), (109, 11), -- A Baltimore Love Thing (Hip-Hop/Rap)
(110, 6), (110, 11), -- Patiently Waiting (Hip-Hop/Rap)
(111, 6), (111, 11), -- What Up Gangsta (Hip-Hop/Rap)
(112, 6), (112, 11), -- U Not Like Me (Hip-Hop/Rap)
(113, 6), (113, 11), -- Poor Lil Rich (Hip-Hop/Rap)
(114, 6), (114, 11), -- Life's On The Line (Hip-Hop/Rap)
(115, 6), (115, 11), -- If I Can't (Hip-Hop/Rap)
(116, 6), (116, 11), -- Gotta Make It To Heaven (Hip-Hop/Rap)
(117, 6), (117, 11), -- Back Down (Hip-Hop/Rap)

-- Eminem (Rap/Hip-Hop)
(118, 11), (118, 6), -- Never Enough (Rap/Hip-Hop)
(119, 11), (119, 6), -- Puke (Rap/Hip-Hop)
(120, 11),           -- Paul (Rap)
(121, 11), (121, 6), -- My 1st Single (Rap/Hip-Hop)
(122, 11), (122, 6), -- Mosh (Rap/Hip-Hop)
(123, 11),           -- Final Thought (Rap)
(124, 11), (124, 6), -- Evil Deeds (Rap/Hip-Hop)
(125, 11), (125, 6), -- Crazy In Love (Rap/Hip-Hop)
(126, 11), (126, 6), -- Big Weenie (Rap/Hip-Hop)
(127, 11), (127, 6), -- Drips (Rap/Hip-Hop)
(128, 11), (128, 6), -- Till I Collapse (Rap/Hip-Hop)
(129, 11), (129, 6), -- My Dad's Gone Crazy (Rap/Hip-Hop)
(130, 11), (130, 6), -- Without Me (Rap/Hip-Hop)
(131, 11),           -- The Kiss (Rap)
(132, 11), (132, 6), -- Square Dance (Rap/Hip-Hop)
(133, 11),           -- Paul Rosenberg (Rap)
(134, 11), (134, 6), -- Hailie's Song (Rap/Hip-Hop)
(135, 11), (135, 6), -- Hailie's Song (Rap/Hip-Hop)

-- Louis Armstrong (Jazz)
(136, 3),           -- Baby It's Cold Outside (Jazz)
(137, 3),           -- Cool Yule (Jazz)
(138, 3),           -- Winter Wonderland (Jazz)
(139, 3),           -- Christmas Night In Harlem (Jazz)
(147, 3),           -- Tin Roof Blues (Jazz)
(148, 3),           -- We Have All The Time in the World (Jazz)
(149, 3),           -- What A Wonderful World (Jazz)
(150, 3),           -- Fantastic That's You (Jazz)
(151, 3),           -- Mame (Jazz)
(152, 3),           -- Moon River (Jazz)
(153, 3),           -- Short But Sweet (Jazz)
(154, 3);           -- The Circle Of Your Arms (Jazz)


INSERT INTO subtitles (track_id, start_time_ms, end_time_ms, text)
VALUES
-- AC/DC - Thunderstruck
(31, 0, 15000, '[Intro] iconic guitar arpeggio build-up'),
(31, 15000, 45000, '[Verse] driving rhythm section enters'),
(31, 45000, 75000, '[Chorus] powerful vocal delivery with heavy guitars'),
(31, 75000, 120000, '[Solo] blistering guitar solo'),
(31, 120000, 150000, '[Bridge] rhythmic breakdown'),
(31, 150000, 175000, '[Outro] fading guitar riff'),

-- Queen - Another One Bites The Dust
(63, 0, 10000, '[Intro] famous bassline and drum beat'),
(63, 10000, 35000, '[Verse] rhythmic vocals over funky groove'),
(63, 35000, 60000, '[Chorus] anthemic vocal hook'),
(63, 60000, 85000, '[Breakdown] stripped-back instrumental section'),
(63, 85000, 110000, '[Outro] repeating bass motif fadeout'),

-- Eminem - Without Me
(130, 0, 15000, '[Intro] comic book style intro with sound effects'),
(130, 15000, 45000, '[Verse] rapid-fire lyrical delivery'),
(130, 45000, 75000, '[Chorus] catchy melodic hook with beat emphasis'),
(130, 75000, 105000, '[Bridge] rhythmic pattern change'),
(130, 105000, 135000, '[Outro] ad-libs and beat breakdown'),

-- Lady Gaga - Poker Face
(96, 0, 12000, '[Intro] synth melody and electronic beat'),
(96, 12000, 40000, '[Verse] vocal effects over dance rhythm'),
(96, 40000, 70000, '[Chorus] infectious pop hook with layered vocals'),
(96, 70000, 95000, '[Breakdown] minimal electronic section'),
(96, 95000, 120000, '[Outro] synth melody repetition'),

-- Beyonce - Crazy In Love
(90, 0, 15000, '[Intro] brass fanfare and drum beat'),
(90, 15000, 45000, '[Verse] R&B vocal flow over hip-hop beat'),
(90, 45000, 75000, '[Chorus] powerful vocals with horn accents'),
(90, 75000, 100000, '[Bridge] tempo shift and vocal ad-libs'),
(90, 100000, 125000, '[Outro] horn section finale'),

-- Black Sabbath - Iron Man
(78, 0, 30000, '[Intro] heavy iconic guitar riff'),
(78, 30000, 90000, '[Verse] doom-laden vocal delivery'),
(78, 90000, 150000, '[Chorus] powerful metal anthem section'),
(78, 150000, 210000, '[Solo] distorted guitar solo'),
(78, 210000, 240000, '[Outro] slowing riff repetition'),

-- 50 Cent - In Da Club
(107, 0, 15000, '[Intro] Dr. Dre signature production intro'),
(107, 15000, 45000, '[Verse] smooth rap flow over minimal beat'),
(107, 45000, 75000, '[Chorus] catchy hip-hop hook'),
(107, 75000, 105000, '[Bridge] beat breakdown with ad-libs'),
(107, 105000, 135000, '[Outro] fading synth melody'),

-- Louis Armstrong - What A Wonderful World
(149, 0, 20000, '[Intro] gentle brass and string arrangement'),
(149, 20000, 60000, '[Verse] warm vocal delivery with jazz band'),
(149, 60000, 90000, '[Bridge] orchestral swell and trumpet fill'),
(149, 90000, 120000, '[Outro] soft instrumental fade'),

-- Megadeth - Holy Wars
(50, 0, 30000, '[Intro] thrash metal guitar attack'),
(50, 30000, 90000, '[Verse] rapid technical riffing'),
(50, 90000, 150000, '[Chorus] aggressive vocal delivery'),
(50, 150000, 210000, '[Solo] virtuoso guitar exchange'),
(50, 210000, 270000, '[Outro] complex rhythm patterns'),

-- Additional popular tracks with musical descriptions
(39, 0, 15000, '[Intro] classic rock guitar riff'),
(39, 15000, 45000, '[Verse] driving rock rhythm'),
(39, 45000, 75000, '[Chorus] anthemic rock vocals'),
(39, 75000, 100000, '[Solo] raw guitar solo'),

(67, 0, 20000, '[Intro] building piano chords'),
(67, 20000, 60000, '[Verse] emotional vocal delivery'),
(67, 60000, 90000, '[Chorus] stadium anthem climax'),
(67, 90000, 120000, '[Outro] fading vocal harmonies'),

(130, 0, 15000, '[Intro] sampled vocal snippet and beat drop'),
(130, 15000, 45000, '[Verse] complex rhyme patterns'),
(130, 45000, 75000, '[Chorus] melodic hook with background vocals'),
(130, 75000, 105000, '[Bridge] beat switch and lyrical intensity'),

(96, 0, 12000, '[Intro] electronic synth intro'),
(96, 12000, 40000, '[Verse] pop vocal delivery with electronic effects'),
(96, 40000, 70000, '[Chorus] dance-pop hook'),
(96, 70000, 95000, '[Break] instrumental breakdown'),
(96, 95000, 120000, '[Outro] synth melody fade');

SELECT setval(pg_get_serial_sequence('albums', 'id'), (SELECT MAX(id) FROM albums));
SELECT setval(pg_get_serial_sequence('tracks', 'id'), (SELECT MAX(id) FROM tracks));
SELECT setval(pg_get_serial_sequence('genres', 'id'), (SELECT MAX(id) FROM genres));
SELECT setval(pg_get_serial_sequence('playlists', 'id'), (SELECT MAX(id) FROM playlists));