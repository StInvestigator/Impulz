import { Box, Button, Typography } from "@mui/material";
import mainImage from "../assets/mainImage.svg"

import GenreList from "../components/lists/GenreList";
import TrackBigCarouselList from "../components/carousel_list/TrackBigCarouselList";
import TrackSmallCarouselList from "../components/carousel_list/TrackSmallCarouselList";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";
import PlaylistCarouselList from "../components/carousel_list/PlaylistCarouselList";
import TopFiveGenreList from "../components/lists/TopFiveGenreList";
import { useTranslation } from 'react-i18next';
import TopSelectionsList from "../components/lists/TopSelectionsList.tsx";
import { useAppNavigate } from "../hooks/useAppNavigate.ts";
import { fetchTop20TracksByWeek } from "../store/reducers/action-creators/tracks.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { useEffect } from "react";
import { fetchTop20AuthorsByWeek } from "../store/reducers/action-creators/author.ts";
import { fetchTop20PlaylistsByWeek } from "../store/reducers/action-creators/playlist.ts";

const tracks = [
    'Трек 2', 'Трек 2', 'Трек 3',
    'Трек 4', 'Трек 5', 'Трек 6',
    'Трек 7', 'Трек 8', 'Трек 9', 'Трек 10', 'Трек 11',
    'Трек 12', 'Трек 13', 'Трек 14',
    'Трек 15', 'Трек 16'
];

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { topTracks, isLoading: tracksLoading, error: tracksError } = useAppSelector((state) => state.track);
    const { topAuthors, isLoading: authorsLoading, error: authorsError } = useAppSelector((state) => state.author);
    const { topPlaylists, isLoading: playlistsLoading, error: playlistsError } = useAppSelector((state) => state.playlist);

    const route = useAppNavigate()
    const { t } = useTranslation(['main', 'other'])

    useEffect(() => {
        dispatch(fetchTop20TracksByWeek());
        dispatch(fetchTop20AuthorsByWeek());
        dispatch(fetchTop20PlaylistsByWeek());

        console.log(topAuthors);
    }, [dispatch]);

    return (
        <>
            <Box component={"img"} src={mainImage} width={"100%"} draggable={"false"} />
            <Box component={"section"} display={"flex"} gap={3} mt={"60px"}>
                <TrackBigCarouselList tracks={topTracks} isLoading={tracksLoading} error={tracksError} itemHeight={266} itemWidth={200} variant={"h1"} title={t("main:title-hits-week")} />
                <GenreList />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <AuthorCarouselList authors={topAuthors} isLoading={authorsLoading} error={authorsError} itemWidth={134} name={t("main:title-best-author-month")} />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <PlaylistCarouselList playlists={topPlaylists} isLoading={playlistsLoading} error={playlistsError} itemWidth={134} name={t("main:title-listen-best-playlists")} />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <TopFiveGenreList />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <TrackSmallCarouselList tracks={tracks} itemWidth={134} name={t("main:title-recomendation-today")} />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <TrackSmallCarouselList tracks={tracks} itemWidth={134} name={t("main:title-watch-for-you")} />
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
                <TopSelectionsList />
            </Box>
        </>
    );
};

export default MainPage;