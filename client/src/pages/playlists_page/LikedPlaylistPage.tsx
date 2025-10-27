import { useEffect } from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import {useAppDispatch, useAppSelector} from "../../hooks/redux";
import keycloak from "../../keycloak.ts";
import {fetchLikedTracksByUserId} from "../../store/reducers/action-creators/tracks.ts";
import Cover from "../../components/Cover.tsx";
import PlaylistLikedTracks from "../../assets/PlaylistLikedTracks.svg";
import TrackList from "../../components/lists/TrackList.tsx";
import MyPagination from "../../components/MyPagination.tsx";

const LikedPlaylistPage = () => {
    const dispatch = useAppDispatch();
    const { currentPage } = useAppSelector(state => state.page);
    const { likedTracks, isLoading, error } = useAppSelector(state => state.track);

    const { t } = useTranslation(["other","errors"]);
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if(userId){
            dispatch(fetchLikedTracksByUserId({userId}));
        }
    }, [dispatch, userId]);

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

    if (!likedTracks || likedTracks.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <Typography>
                    {likedTracks && likedTracks.length === 0
                        ? t("errors:error-no-tracks-in-playlist")
                        : t("errors:error-playlist-not-found")
                    }
                </Typography>
            </Box>
        );
    }

    const formatDuration = (totalSeconds: number): string => {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        if (hours > 0) {
            return `${hours} ${t("other:title-hours")} ${minutes} ${t("other:title-minutes")}`;
        }
        return `${minutes} ${t("other:title-minutes")} ${seconds} ${t("other:title-seconds")}`;
    };

    const totalDuration = likedTracks.reduce((acc, track) => acc + (track.durationSec || 0), 0) || 0;

    const handlePlayPlaylist = async (e: React.MouseEvent) => {
        e.stopPropagation();
    }

    return (
        <>
            <Box component={"section"}>
                <Cover
                    type={"myPlaylist"}
                    title={t("other:title-favorite")}
                    OwnerNames={["You"]}
                    OwnerImageUrl={PlaylistLikedTracks}
                    trackCount={likedTracks.length}
                    duration={formatDuration(totalDuration)}
                    imgUrl={PlaylistLikedTracks}
                    handlePlay={handlePlayPlaylist}
                />
            </Box>

            <Box component={"section"} marginTop={"60px"}>
                {likedTracks.length > 0 ? (
                    <>
                        <Stack spacing={3}>
                            <TrackList tracks={likedTracks} />
                        </Stack>
                        <Box component={"section"} marginTop={"60px"}>
                            <MyPagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(likedTracks.length / 20)}
                            />
                        </Box>
                    </>
                ) : (
                    <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                        <Typography variant="h6" color="text.secondary">
                            {t("errors:error-no-tracks-in-playlist")}
                        </Typography>
                    </Box>
                )}
            </Box>
        </>
    );
};

export default LikedPlaylistPage;