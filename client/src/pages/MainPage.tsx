import {useEffect} from 'react';
import {Box, Button, Typography} from "@mui/material";
import mainImage from "../assets/mainImage.svg"
import GenreList from "../components/lists/GenreList";
import TrackBigCarouselList from "../components/carousel_list/TrackBigCarouselList";
import TrackSmallCarouselList from "../components/carousel_list/TrackSmallCarouselList";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";
import PlaylistCarouselList from "../components/carousel_list/PlaylistCarouselList";
import TopFiveGenreList from "../components/lists/TopFiveGenreList";
import { useTranslation } from 'react-i18next';
import TopSelectionsList from "../components/lists/TopSelectionsList.tsx";
import {useAppNavigate} from "../hooks/useAppNavigate.ts";

const tracks = [
    'Трек 1', 'Трек 2', 'Трек 3',
    'Трек 4', 'Трек 5', 'Трек 6',
    'Трек 7', 'Трек 8','Трек 9', 'Трек 10', 'Трек 11',
    'Трек 12', 'Трек 13', 'Трек 14',
    'Трек 15', 'Трек 16'
];

const authors = [
    'Автор 1', 'Автор 2', 'Автор 3',
    'Автор 4', 'Автор 5', 'Автор 6',
    'Автор 7', 'Автор 8','Автор 9', 'Автор 10', 'Автор 11',
    'Автор 12', 'Автор 13', 'Автор 14',
    'Автор 15', 'Автор 16'
];

const playlist = [
    'Плейлист 1', 'Плейлист 2', 'Плейлист 3',
    'Плейлист 4', 'Плейлист 5', 'Плейлист 6',
    'Плейлист 7', 'Плейлист 8','Плейлист 9', 'Плейлист 10', 'Плейлист 11',
    'Плейлист 12', 'Плейлист 13', 'Плейлист 14',
    'Плейлист 15', 'Плейлист 16'
];


const MainPage = () => {
    useEffect(() => {
        fetch('http://localhost:8083/api/playlists/') // replace with your backend URL
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    }, []);
    const route = useAppNavigate()
    const { t } = useTranslation(['main', 'other'])
    return (
        <>
            <Box component={"img"} src={mainImage} width={"100%"} draggable={"false"}/>
            <Box component={"section"} display={"flex"} gap={3} mt={"60px"}>
                <TrackBigCarouselList tracks={tracks} itemHeight={266} itemWidth={200} variant={"h1"} title={t("main:title-hits-week")}/>
                <GenreList/>
            </Box>
            <Box component={"section"} mt={"60px"}>
                <AuthorCarouselList authors={authors} itemWidth={134} name={t("main:title-best-author-month")}/>
            </Box>
            <Box component={"section"} mt={"60px"}>
                <PlaylistCarouselList playlists={playlist} itemWidth={134} name={t("main:title-listen-best-playlists")}/>
            </Box>
            <Box component={"section"} mt={"60px"}>
                <TopFiveGenreList/>
            </Box>
            <Box component={"section"} mt={"60px"}>
                <TrackSmallCarouselList tracks={tracks} itemWidth={134} name={t("main:title-recomendation-today")}/>
            </Box>
            <Box component={"section"} mt={"60px"}>
                <TrackSmallCarouselList tracks={tracks} itemWidth={134} name={t("main:title-watch-for-you")}/>
            </Box>
            <Box component={"section"} mt={"60px"}>
                <Box display={"flex"} justifyContent={"space-between"} marginBottom={2} px={3}>
                    <Typography variant={"h1"} fontSize={"36px"} fontWeight={700}>
                        {t("main:title-top-selections")}
                    </Typography>
                    <Button onClick={() => route("/allTopSelections")} sx={{
                        height: "32px",
                        border: "1px solid black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        fontWeight: 600,
                        color: "black",
                        textTransform: "none"
                    }}>
                        {t("other:button-watch-all")}
                    </Button>
                </Box>
                <TopSelectionsList/>
            </Box>
        </>
    );
};

export default MainPage;