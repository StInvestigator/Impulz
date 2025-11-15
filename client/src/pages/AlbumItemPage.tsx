import MyPagination from "../components/MyPagination.tsx";
import { useEffect } from "react";
import { Box, Stack, CircularProgress, IconButton } from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import Cover from "../components/Cover.tsx";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { fetchAlbumDetails } from "../store/reducers/action-creators/album.ts";
import { useParams, Navigate  } from "react-router-dom";
import { usePlayTrack } from "../hooks/usePlayTrack.tsx";
import { fetchTracksByAlbumForPlayer } from "../store/reducers/action-creators/tracks.ts";
import { useTranslation } from "react-i18next";
import keycloak from "../keycloak.ts";
import { useContextMenu } from "../hooks/useContextMenu.ts";
import additionalIcon from "../assets/AdditionalIcon.svg";
import { EditAlbumContextMenu } from "../components/contextMenu/EditAlbumContextMenu.tsx";


const AlbumItemPage = () => {
    const { currentPage } = useAppSelector(state => state.page);
    const { albumId } = useParams<{ albumId: string }>();
    const dispatch = useAppDispatch();
    const { currentAlbum, isLoading, error } = useAppSelector(state => state.album);
    const { playTrackList } = usePlayTrack();
    const currentUserId = keycloak.tokenParsed?.sub;
    const { t } = useTranslation(["other", "errors"]);
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useContextMenu();

    const id = Number(albumId)

    useEffect(() => {
        if (id) {
            dispatch(fetchAlbumDetails(id))
        }
    }, [dispatch, albumId, id]);

    if (isLoading || !currentAlbum) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return <Navigate to="/notFound" replace />;
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

    const totalDuration = currentAlbum.tracks?.reduce(
        (acc, track) => acc + (track.durationSec || 0),
        0
    ) || 0;

    const ownerNames = currentAlbum.authors?.map(author => author.name) || [];
    const ownerImageUrl = currentAlbum.authors?.[0]?.imgUrl || "";
    const releaseYear = currentAlbum.releaseDate
        ? new Date(currentAlbum.releaseDate).getFullYear()
        : undefined;

    const handlePlayPlaylist = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const result = await dispatch(fetchTracksByAlbumForPlayer({
            albumId: id,
            page: 0,
            size: 1000
        }));

        if (fetchTracksByAlbumForPlayer.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

    let isOwner = false;
    if (currentUserId) {
        isOwner = currentAlbum.authors.map(a => a.id).includes(currentUserId);
    }

     const releaseDate = currentAlbum.releaseDate
        ? new Date(currentAlbum.releaseDate)
        : null;
    const now = new Date();

    if (releaseDate && releaseDate > now && !isOwner) {
        return <Navigate to="/notFound" replace />;
    }

    return (
        <>
            <Box component="section" sx={{ position: "relative" }}>
                <Cover
                    type={isOwner ? "myAlbum" : "album"}
                    title={currentAlbum.title || "Без названия"}
                    OwnerNames={ownerNames}
                    OwnerImageUrl={ownerImageUrl}
                    year={releaseYear}
                    trackCount={currentAlbum.tracks?.length || 0}
                    duration={formatDuration(totalDuration)}
                    imgUrl={currentAlbum.imgUrl || ""}
                    handlePlay={handlePlayPlaylist}
                />

                {isOwner &&
                    <IconButton
                        sx={{
                            position: "absolute",
                            top: 16,
                            right: 16,
                            padding: 1,
                        }}
                        onClick={(e) => handleContextMenu(e, Number(currentAlbum.id))}
                    >
                        <Box component="img" src={additionalIcon} height="28px" width="28px" />
                    </IconButton>}
            </Box>

            {currentAlbum.tracks?.length > 0 && (
                <>
                    <Box component="section" marginTop="60px">
                        <Stack spacing={3}>
                            <TrackList tracks={currentAlbum.tracks} />
                        </Stack>
                    </Box>

                    <Box component="section" marginTop="60px">
                        <MyPagination
                            currentPage={currentPage}
                            totalPages={Math.ceil(currentAlbum.tracks.length / 20)}
                        />
                    </Box>
                </>

            )}
            <EditAlbumContextMenu
                album={currentAlbum}
                contextMenu={contextMenu}
                onClose={handleCloseContextMenu}
            />
        </>
    );
};

export default AlbumItemPage;