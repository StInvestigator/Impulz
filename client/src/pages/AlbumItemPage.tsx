import MyPagination from "../components/MyPagination.tsx";
import { useEffect } from "react";
import { Box, Stack, CircularProgress, Typography } from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import Cover from "../components/Cover.tsx";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { fetchAlbumDetails } from "../store/reducers/action-creators/album.ts";
import { useParams } from "react-router-dom";
import { usePlayTrack } from "../hooks/usePlayTrack.tsx";
import { fetchTracksByAlbum } from "../store/reducers/action-creators/tracks.ts";

const AlbumItemPage = () => {
    const { currentPage } = useAppSelector(state => state.page);
    const { albumId } = useParams<{ albumId: string }>();
    const dispatch = useAppDispatch();
    const { currentAlbum, isLoading, error } = useAppSelector(state => state.album);
    const { playTrackList } = usePlayTrack();

    const id = Number(albumId)
    
    useEffect(() => {
        if (albumId) {
            if (!isNaN(id)) {
                dispatch(fetchAlbumDetails(id))
                    .unwrap()
                    .then((data) => console.log("✅ Album fetched:", data))
                    .catch((e) => console.error("❌ Album fetch failed:", e));
            }
        }
    }, [dispatch, albumId]);

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

    if (!currentAlbum) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
                <Typography>Album not found</Typography>
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

        const result = await dispatch(fetchTracksByAlbum({
            albumId: id,
            page: 0,
            size: 1000
        }));

        if (fetchTracksByAlbum.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

    return (
        <>
            <Box component="section">
                <Cover
                    type="album"
                    title={currentAlbum.title || "Без названия"}
                    OwnerNames={ownerNames}
                    OwnerImageUrl={ownerImageUrl}
                    year={releaseYear}
                    trackCount={currentAlbum.tracks?.length || 0}
                    duration={formatDuration(totalDuration)}
                    imgUrl={currentAlbum.imgUrl || ""}
                    handlePlay={handlePlayPlaylist}
                />
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
        </>
    );
};

export default AlbumItemPage;