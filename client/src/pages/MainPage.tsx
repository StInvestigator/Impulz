import React from 'react';
import {Box, Typography} from "@mui/material";
import mainImage from "../images/mainImage.png"
import ListCarousel from "../components/ListCarousel";
import TrackCarouselList from "../components/carousel_list/TrackCarouselList";
import TrackItem from "../components/items/TrackItem";
import GenreList from "../components/lists/GenreList";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";
import BestPlaylistCarouselList from "../components/carousel_list/BestPlaylistCarouselList";

const tracks = [
    'Трек 1', 'Трек 2', 'Трек 3',
    'Трек 4', 'Трек 5', 'Трек 6',
    'Трек 7', 'Трек 8','Трек 1', 'Трек 2', 'Трек 3',
    'Трек 4', 'Трек 5', 'Трек 6',
    'Трек 7', 'Трек 8'
];

const authors = [
    'Автор 1', 'Автор 2', 'Автор 3',
    'Автор 4', 'Автор 5', 'Автор 6',
    'Автор 7', 'Автор 8','Автор 1', 'Автор 2', 'Автор 3',
    'Автор 4', 'Автор 5', 'Автор 6',
    'Автор 7', 'Автор 8'
];

const playlist = [
    'Плейлист 1', 'Плейлист 2', 'Плейлист 3',
    'Плейлист 4', 'Плейлист 5', 'Плейлист 6',
    'Плейлист 7', 'Плейлист 8','Плейлист 1', 'Плейлист 2', 'Плейлист 3',
    'Плейлист 4', 'Плейлист 5', 'Плейлист 6',
    'Плейлист 7', 'Плейлист 8'
];

const MainPage = () => {
    return (
        <>
            <Box component={"img"} src={mainImage} width={"100%"}/>
            <Box component={"section"} display={"flex"} gap={3} mt={6} sx={{
                width: '100%',
            }}>
                <TrackCarouselList tracks={tracks} itemWidth={200}/>
                <GenreList/>
            </Box>
            <Box component={"section"} mt={6} sx={{
                width: '100%',
            }}>
                <AuthorCarouselList authors={authors} itemWidth={134}/>
            </Box>
            <Box component={"section"} mt={6} sx={{
                width: '100%',
            }}>
                <BestPlaylistCarouselList playlists={playlist} itemWidth={134}/>
            </Box>
        </>
    );
};

export default MainPage;