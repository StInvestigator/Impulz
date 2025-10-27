import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert, Button } from "@mui/material";
import { selectTracksResults, selectAlbumsResults, selectAuthorsResults, selectPlaylistsResults, selectSearchError, selectSearchLoading } from "../../store/reducers/SearchSlice.ts";
import type { AppDispatch } from "../../store/store.ts";
import { useAppNavigate } from "../../hooks/useAppNavigate.ts";
import AlbumList from "../../components/lists/AlbumList.tsx";
import { useTranslation } from "react-i18next";
import AuthorList from "../../components/lists/AuthorList.tsx";
import TrackList from "../../components/lists/TrackList.tsx";
import PublicPlaylistList from "../../components/lists/PublicPlaylistList.tsx";
import { searchAlbums, searchAuthors, searchPublicPlaylists, searchTracks } from "../../store/reducers/action-creators/search.ts";
import { setCurrentPage } from '../../store/reducers/PageSlice';

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const dispatch = useDispatch<AppDispatch>();
    const route = useAppNavigate();

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    const { t } = useTranslation(["search", "other"]);

    const tracks = useSelector(selectTracksResults);
    const albums = useSelector(selectAlbumsResults);
    const authors = useSelector(selectAuthorsResults);
    const playlists = useSelector(selectPlaylistsResults);
    const loading = useSelector(selectSearchLoading);
    const error = useSelector(selectSearchError);

    useEffect(() => {
        if (query) {
            dispatch(searchAlbums({ query, page: 0, size: 4 }));
            dispatch(searchAuthors({ query, page: 0, size: 5 }));
            dispatch(searchTracks({ query, page: 0, size: 5 }));
            dispatch(searchPublicPlaylists({ query, page: 0, size: 4 }));
        }
    }, [query, dispatch]);

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Alert severity="error">{error}</Alert>;
    }

    const hasResults = tracks.length > 0 || authors.length > 0 || albums.length > 0 || playlists.length > 0;

    return (
        <Box p={3}>
            {hasResults &&
                (<Typography variant="h2" gutterBottom>
                    {t("search:title-result")} "{query}":
                </Typography>)
            }
            {/* Треки */}
            {tracks.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                        <Typography variant={"h4"} fontSize={"28px"} color="var(--indigo-dye)">
                            {t("search:title-tracks")}
                        </Typography>
                        <Button onClick={() => route(`/search/${query}/tracks`)} sx={{
                            height: "32px",
                            border: "1px solid black",
                            borderRadius: "10px",
                            fontSize: "12px",
                            fontWeight: 600,
                            backgroundColor: "var(--dark-purple)",
                            color: "var(--columbia-blue)",
                            textTransform: "none"
                        }}>
                            {t("other:button-watch-all")}
                        </Button>
                    </Box>
                    <Box display={"grid"} sx={{
                        gridTemplateColumns: "repeat(1, 1fr)"
                    }} gap={3}>
                        <TrackList tracks={tracks} />
                    </Box>
                </Box>
            )}


            {/* Альбоми */}
            {albums.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                        <Typography variant={"h2"} fontSize={"24px"} color="var(--indigo-dye)">
                            {t("search:title-albums")}
                        </Typography>
                        <Button onClick={() => route(`/search/${query}/albums`)} sx={{
                            height: "32px",
                            border: "1px solid black",
                            borderRadius: "10px",
                            backgroundColor: "var(--dark-purple)",
                            color: "var(--columbia-blue)",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "none"
                        }}>
                            {t("other:button-watch-all")}
                        </Button>
                    </Box>
                    <AlbumList albums={albums} />
                </Box>
            )}


            {/* Плейлисты */}
            {playlists.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                        <Typography variant={"h4"} fontSize={"28px"} color="var(--indigo-dye)">
                            {t("search:title-playlists")}
                        </Typography>
                        <Button onClick={() => route(`/search/${query}/playlists`)} sx={{
                            height: "32px",
                            border: "1px solid black",
                            borderRadius: "10px",
                            backgroundColor: "var(--dark-purple)",
                            color: "var(--columbia-blue)",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "none"
                        }}>
                            {t("other:button-watch-all")}
                        </Button>
                    </Box>
                    <Box display={"grid"} mt={3} sx={{
                        gridTemplateColumns: "repeat(4, 1fr)"
                    }} gap={3}>
                        <PublicPlaylistList playlists={playlists} />
                    </Box>
                </Box>
            )}

            {/* Автори */}
            {authors.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"} marginBottom={"20px"}>
                        <Typography variant={"h4"} fontSize={"28px"} color="var(--indigo-dye)">
                            {t("search:title-authors")}
                        </Typography>
                        <Button onClick={() => route(`/search/${query}/authors`)} sx={{
                            height: "32px",
                            border: "1px solid black",
                            borderRadius: "10px",
                            backgroundColor: "var(--dark-purple)",
                            color: "var(--columbia-blue)",
                            fontSize: "12px",
                            fontWeight: 600,
                            textTransform: "none"
                        }}>
                            {t("other:button-watch-all")}
                        </Button>
                    </Box>
                    <AuthorList authors={authors} />
                </Box>
            )}

            {/* Нет результатов */}
            {!loading && !hasResults && (
                <Typography align="center" variant="h2">{t("search:title-nothing-found")}</Typography>
            )}
        </Box>
    );
};

export default SearchResultsPage;