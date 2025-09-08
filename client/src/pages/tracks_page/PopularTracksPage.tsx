import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../../components/lists/TrackList";
import MyPagination from "../../components/MyPagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchPopularTracksByAuthor } from "../../store/reducers/action-creators/tracks";

export default function FavoriteTracksPage() {
    const [page, setPage] = useState(1);
    const {id} = useParams<{ id:string }>();

    const dispatch = useAppDispatch();
    const { popularTracks } = useAppSelector(state => state.track);

    useEffect(() => {
        if (id){
            dispatch(fetchPopularTracksByAuthor({ authorId: id, page: page - 1, size: 20 }));
        }
        console.log(popularTracks);
    }, [dispatch, page]);

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    Популярні треки автора
                </Typography>
                <Stack spacing={3} mt={3}>
                    <TrackList tracks={popularTracks}/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={page} onPageChange={setPage}/>
            </Box>
        </>
    );
}
