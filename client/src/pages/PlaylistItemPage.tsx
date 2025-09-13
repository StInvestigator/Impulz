import MyPagination from "../components/MyPagination.tsx";
import {useEffect} from "react";
import {Box, Stack, CircularProgress, Typography} from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import Cover from "../components/Cover.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchPlaylistDetails} from "../store/reducers/action-creators/playlist.ts";
import {useParams} from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";

const PlaylistItemPage = () => {
    const { currentPage } = useAppSelector(state => state.page);
    const { playlistId } = useParams<{ playlistId: string }>();
    const dispatch = useAppDispatch();
    const { currentPlaylist, isLoading, error } = useAppSelector(state => state.playlist);
    const { keycloak } = useKeycloak();

    useEffect(() => {
        if (playlistId) {
            dispatch(fetchPlaylistDetails(playlistId));
        }
    }, [dispatch, playlistId]);

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    if (!currentPlaylist) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <Typography>Плейлист не знайдено</Typography>
            </Box>
        );
    }

    const currentUserId = keycloak.tokenParsed?.sub;
    const isOwner = currentPlaylist.owner.id === currentUserId;

    const formatDuration = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours} год ${minutes} хв`;
        }
        return `${minutes} хв ${seconds} с`;
    };

    const totalDuration = currentPlaylist.tracks.reduce((acc, track) => acc + track.durationSec, 0);

    return (
        <>
            <Box component={"section"}>
                <Cover
                    type={isOwner ? "myPlaylist" : currentPlaylist.isPublic ? "publicPlaylist" : "privatePlaylist"}
                    title={currentPlaylist.title}
                    authorName={currentPlaylist.owner.name}
                    trackCount={currentPlaylist.tracks.length}
                    duration={formatDuration(totalDuration)}
                />
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <Stack spacing={3}>
                    <TrackList tracks={currentPlaylist.tracks}/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(currentPlaylist.tracks.length / 20)}
                />
            </Box>
        </>
    );
};

export default PlaylistItemPage;