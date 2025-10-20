import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { useParams } from "react-router-dom";
import { Box, Stack, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import { fetchPopularTracksByGenre } from '../../store/reducers/action-creators/tracks.ts';
import TrackList from "../../components/lists/TrackList";

function BestTracksInGenrePage() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["category"]);
    const { id } = useParams<{ id: string }>();
    const genreId = Number(id)

    const dispatch = useAppDispatch();
    const { popularTracksByGenre } = useAppSelector(state => state.track);


    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    const size = 10;

    useEffect(() => {
        if (currentPage >= 1) {
            dispatch(
                fetchPopularTracksByGenre({
                    genreId,
                    page: currentPage - 1,
                    size: size,
                })
            );
        }
    }, [dispatch, genreId, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-best-song-genre")}
                </Typography>

                <Stack spacing={3} mt={3}>
                    <TrackList tracks={popularTracksByGenre} pageSize={size}/>
                </Stack>
            </Box>

            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage} />
                </Box>
            )}
        </>
    );
}

export default BestTracksInGenrePage;