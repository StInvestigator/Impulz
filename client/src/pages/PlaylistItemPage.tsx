import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { fetchPlaylistDetails } from "../store/reducers/action-creators/playlist.ts";
import Cover from "../components/Cover.tsx";
import TrackList from "../components/lists/TrackList.tsx";
import MyPagination from "../components/MyPagination.tsx";

const PlaylistItemPage = () => {
    const { playlistId } = useParams<{ playlistId: string }>();
    const dispatch = useAppDispatch();
    const { currentPlaylist, isLoading, error } = useAppSelector(state => state.playlist);
    const { currentPage } = useAppSelector(state => state.page);

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
                <Typography>Плейлист не найден</Typography>
            </Box>
        );
    }

    const formatDuration = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours} год ${minutes} хв`;
        }
        return `${minutes} хв ${seconds} с`;
    };

    const totalDuration = currentPlaylist.tracks?.reduce((acc, track) => acc + (track.durationSec || 0), 0) || 0;

    const ownerNames = currentPlaylist.owner ? [currentPlaylist.owner.name] : [];
    const ownerImageUrl = currentPlaylist.owner?.imgUrl || "";
    const isOwner = true;

    return (
        <>
            <Box component={"section"}>
                <Cover
                    type={isOwner ? "myPlaylist" : currentPlaylist.isPublic ? "publicPlaylist" : "privatePlaylist"}
                    title={currentPlaylist.title || "Без названия"}
                    OwnerNames={ownerNames}
                    OwnerImageUrl={ownerImageUrl}
                    trackCount={currentPlaylist.tracks?.length || 0}
                    duration={formatDuration(totalDuration)}
                    imgUrl={currentPlaylist.imageUrl}
                />
            </Box>

            {currentPlaylist.tracks && currentPlaylist.tracks.length > 0 && (
                <>
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
            )}
        </>
    );
};

export default PlaylistItemPage;