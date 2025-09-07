import MyPagination from "../components/MyPagination.tsx";
import {useEffect, useState} from "react";
import {Box, Stack} from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import Cover from "../components/Cover.tsx";
import {useAppDispatch, useAppSelector} from "../hooks/redux.ts";
import {fetchAlbumDetails} from "../store/reducers/action-creators/album.ts";
import {useParams} from "react-router-dom";


const PlaylistItemPage = () => {
    const [page, setPage] = useState(1)
    const { albumId } = useParams<{ albumId: string }>();
    const dispatch = useAppDispatch();
    const { currentAlbum } = useAppSelector(state => state.album);

    useEffect(() => {
        if (albumId) {
            const id = parseInt(albumId, 10);
            if (!isNaN(id)) {
                dispatch(fetchAlbumDetails(id));
            }
        }
    }, [dispatch, albumId]);

    return (
        <>
            <Box component={"section"}>
                <Cover type={"myPlaylist"}/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <Stack spacing={3}>
                    <TrackList tracks={currentAlbum?.tracks || [] }/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination currentPage={page} onPageChange={setPage} totalPages={30}/>
            </Box>
        </>
    );
};

export default PlaylistItemPage;