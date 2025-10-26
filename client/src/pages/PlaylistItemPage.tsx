import React, { useEffect } from "react";
import {Navigate, useParams} from "react-router-dom";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { fetchPlaylistDetails } from "../store/reducers/action-creators/playlist.ts";
import Cover from "../components/Cover.tsx";
import TrackList from "../components/lists/TrackList.tsx";
import MyPagination from "../components/MyPagination.tsx";
import { usePlayTrack } from "../hooks/usePlayTrack.tsx";
import { fetchTracksByPlaylist } from "../store/reducers/action-creators/tracks.ts";
import { useTranslation } from "react-i18next";
import PlaylistDefaultImage from "../assets/PlaylistDefaultImage.svg"
import keycloak from "../keycloak.ts";

const PlaylistItemPage = () => {
    const { playlistId } = useParams<{ playlistId: string }>();
    const dispatch = useAppDispatch();
    const { currentPlaylist, isLoading, error } = useAppSelector(state => state.playlist);
    const { currentPage } = useAppSelector(state => state.page);
    const { playTrackList } = usePlayTrack();
    const currentUserId = keycloak.tokenParsed?.sub;

    const id = Number(playlistId)
    const { t } = useTranslation(["other","errors"]);


    useEffect(() => {
        if(playlistId){
            dispatch(fetchPlaylistDetails(playlistId));
        }
    }, [playlistId]);

    if(!isLoading && currentPlaylist && !currentPlaylist.isPublic){
        const isOwner = currentPlaylist.owner.id === currentUserId;
        if(!isOwner){
            return <Navigate to={"/notFound"} replace/>
        }
    }

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
                <Typography>${t("errors:error-playlist-not-found")}</Typography>
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

    const totalDuration = currentPlaylist.tracks?.reduce((acc, track) => acc + (track.durationSec || 0), 0) || 0;

    const ownerNames = currentPlaylist.owner ? [currentPlaylist.owner.name] : [];
    const ownerImageUrl = currentPlaylist.owner?.imgUrl || "";
    const isOwner = true;

    const handlePlayPlaylist = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const result = await dispatch(fetchTracksByPlaylist({
            playlistId: id,
            page: 0,
            size: 1000
        }));

        if (fetchTracksByPlaylist.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

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
                    imgUrl={currentPlaylist.imgUrl || PlaylistDefaultImage}
                    handlePlay={handlePlayPlaylist}
                />
            </Box>

            <Box component={"section"} marginTop={"60px"}>
                {currentPlaylist.tracks && currentPlaylist.tracks.length > 0 ? (
                    <>
                        <Stack spacing={3}>
                            <TrackList tracks={currentPlaylist.tracks} />
                        </Stack>
                        <Box component={"section"} marginTop={"60px"}>
                            <MyPagination
                                currentPage={currentPage}
                                totalPages={Math.ceil(currentPlaylist.tracks.length / 20)}
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

export default PlaylistItemPage;