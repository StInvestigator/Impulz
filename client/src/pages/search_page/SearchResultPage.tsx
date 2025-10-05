import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Box, Typography, CircularProgress, Alert } from "@mui/material";
import {selectGlobalSearchResults, selectSearchError, selectSearchLoading} from "../../store/reducers/SearchSlice.ts";
import {searchAll} from "../../store/reducers/action-creators/search.ts";
import type {AppDispatch} from "../../store/store.ts";

const SearchResultsPage = () => {
    const [searchParams] = useSearchParams();
    const query = searchParams.get("q") || "";
    const dispatch = useDispatch<AppDispatch>();

    const { tracks, authors, albums, playlists } = useSelector(selectGlobalSearchResults);
    const loading = useSelector(selectSearchLoading);
    const error = useSelector(selectSearchError);

    useEffect(() => {
        if (query) {
            dispatch(searchAll(query));
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
            <Typography variant="h4" gutterBottom>
                Результаты поиска: "{query}"
            </Typography>

            {/* Треки */}
            {tracks.length > 0 && (
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom>Треки</Typography>
                    {tracks.map((track) => (
                        <Box key={track.id} p={1} borderBottom="1px solid #eee">
                            <Typography>{track.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {track.authorNames.join(", ")} • {track.albumTitle}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Авторы */}
            {authors.length > 0 && (
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom>Авторы</Typography>
                    {authors.map((author) => (
                        <Box key={author.id} p={1} borderBottom="1px solid #eee">
                            <Typography>{author.name}</Typography>
                            {author.bio && (
                                <Typography variant="body2" color="textSecondary">
                                    {author.bio}
                                </Typography>
                            )}
                        </Box>
                    ))}
                </Box>
            )}

            {/* Альбомы */}
            {albums.length > 0 && (
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom>Альбомы</Typography>
                    {albums.map((album) => (
                        <Box key={album.id} p={1} borderBottom="1px solid #eee">
                            <Typography>{album.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                {album.authorNames.join(", ")}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Плейлисты */}
            {playlists.length > 0 && (
                <Box mb={4}>
                    <Typography variant="h5" gutterBottom>Плейлисты</Typography>
                    {playlists.map((playlist) => (
                        <Box key={playlist.id} p={1} borderBottom="1px solid #eee">
                            <Typography>{playlist.title}</Typography>
                            <Typography variant="body2" color="textSecondary">
                                Владелец: {playlist.ownerName}
                            </Typography>
                        </Box>
                    ))}
                </Box>
            )}

            {/* Нет результатов */}
            {!loading && !hasResults && (
                <Typography>Ничего не найдено</Typography>
            )}
        </Box>
    );
};

export default SearchResultsPage;