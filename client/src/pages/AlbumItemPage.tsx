import MyPagination from "../components/MyPagination.tsx";
import {useEffect} from "react";
import {Box, Stack, CircularProgress, Typography} from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import Cover from "../components/Cover.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchAlbumDetails} from "../store/reducers/action-creators/album.ts";
import {useParams} from "react-router-dom";

const AlbumItemPage = () => {
    const { currentPage } = useAppSelector(state => state.page);
    const { albumId } = useParams<{ albumId: string }>();
    const dispatch = useAppDispatch();
    const { currentAlbum, isLoading, error } = useAppSelector(state => state.album);

    useEffect(() => {
        if (albumId) {
            const id = parseInt(albumId, 10);
            if (!isNaN(id)) {
                dispatch(fetchAlbumDetails(id));
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
                <Typography>Альбом не знайдено</Typography>
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

    const totalDuration = currentAlbum.tracks.reduce((acc, track) => acc + track.durationSec, 0);

    return (
        <>
            <Box component={"section"}>
                <Cover
                    type={"album"}
                    title={currentAlbum.title}
                    authorName={currentAlbum.authors.map(a => a.name).join(", ")}
                    year={currentAlbum.releaseDate ? new Date(currentAlbum.releaseDate).getFullYear() : undefined}
                    trackCount={currentAlbum.tracks.length}
                    duration={formatDuration(totalDuration)}
                    imgUrl={currentAlbum.imgUrl}
                />
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <Stack spacing={3}>
                    <TrackList tracks={currentAlbum.tracks}/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(currentAlbum.tracks.length / 20)}
                />
            </Box>
        </>
    );
};

export default AlbumItemPage;