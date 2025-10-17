import { Box } from "@mui/material";
import mainImage from "../assets/mainImage.svg"
import GenreList from "../components/lists/GenreList";
import TrackBigCarouselList from "../components/carousel_list/TrackBigCarouselList";
import MediaSmallCarouselList from "../components/carousel_list/MediaSmallCarouselList.tsx";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";
import PlaylistCarouselList from "../components/carousel_list/PlaylistCarouselList";
import TopFiveGenreList from "../components/lists/TopFiveGenreList";
import { useTranslation } from 'react-i18next';
import { fetchTopTracksByWeek } from "../store/reducers/action-creators/tracks.ts";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { useEffect } from "react";
import { fetchTopPlaylistsByWeek } from "../store/reducers/action-creators/playlist.ts";
import { fetchTopGenres } from "../store/reducers/action-creators/genre.ts";
import { fetchTopAuthorsByMonth } from "../store/reducers/action-creators/author.ts";
import {fetchAlbumTodayRecommendations, fetchPersonalAlbumsByGenre} from "../store/reducers/action-creators/album.ts";
import {useKeycloak} from "@react-keycloak/web";

const MainPage = () => {
    const dispatch = useAppDispatch();
    const { topTracks, isLoading: tracksLoading, error: tracksError } = useAppSelector((state) => state.track);
    const { topAuthors, isLoading: authorsLoading, error: authorsError } = useAppSelector((state) => state.author);
    const { topPlaylists, isLoading: playlistsLoading, error: playlistsError } = useAppSelector((state) => state.playlist);
    const { topFiveGenres, isLoading: genresLoading, error: genresError } = useAppSelector((state) => state.genre);
    const {
        albumTodayRecommendations,
        albumPersonalRecommendationsByGenre,
        isLoading: albumLoading,
        error: albumError
    } = useAppSelector((state) => state.album);
    const { t } = useTranslation(['main', 'other'])

    const { keycloak } = useKeycloak();
    const isAuthenticated = keycloak.authenticated;


    const userId = isAuthenticated ? keycloak.tokenParsed?.sub : null;

    useEffect(() => {
        dispatch(fetchTopTracksByWeek({ page: 0, size: 20 }));
        dispatch(fetchTopAuthorsByMonth({ page: 0, size: 20 }));
        dispatch(fetchTopPlaylistsByWeek({ page: 0, size: 20 }));
        dispatch(fetchTopGenres({ page: 0, size: 5 }));
        dispatch(fetchAlbumTodayRecommendations({ page: 0, size: 20 }));

        if (isAuthenticated && userId) {
            dispatch(fetchPersonalAlbumsByGenre({ userId, page: 0, size: 20 }));
        }
    }, [dispatch, isAuthenticated, userId]);
    
    return (
        <>
            <Box component={"img"} src={mainImage} width={"100%"} draggable={"false"} />
            <Box component={"section"} display={"flex"} gap={3} mt={"60px"}>
                <TrackBigCarouselList tracks={topTracks} isLoading={tracksLoading} error={tracksError} itemHeight={266} itemWidth={200} variant={"h1"} title={t("main:title-hits-week")} url={"/hitsWeek"} />
                <GenreList />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <AuthorCarouselList authors={topAuthors} isLoading={authorsLoading} error={authorsError} itemWidth={134} name={t("main:title-best-author-month")} url={"/bestAuthorsMonth"} />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <PlaylistCarouselList playlists={topPlaylists} isLoading={playlistsLoading} error={playlistsError} itemWidth={134} name={t("main:title-listen-best-playlists")} url={"/bestPlaylistsWeek"} />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <TopFiveGenreList genres={topFiveGenres} isLoading={genresLoading} error={genresError} />
            </Box>
            <Box component={"section"} mt={"60px"}>
                <MediaSmallCarouselList medias={albumTodayRecommendations} itemWidth={134} name={t("main:title-recommendation-today")} isLoading={albumLoading} error={albumError} url={"/albumTodayRecommendations"}/>
            </Box>
            {isAuthenticated && albumPersonalRecommendationsByGenre.length > 0 &&
                (
                    <Box component={"section"} mt={"60px"}>
                        <MediaSmallCarouselList medias={albumPersonalRecommendationsByGenre} itemWidth={134} name={t("main:title-watch-for-you")} isLoading={playlistsLoading} error={playlistsError} url={"/personalAlbumRecommendations"}/>
                    </Box>
                )
            }
            {/* <Box component={"section"} mt={"60px"}>
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
            </Box> */}
        </>
    );
};

export default MainPage;