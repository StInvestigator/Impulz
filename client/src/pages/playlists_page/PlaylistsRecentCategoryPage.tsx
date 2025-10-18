import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import { fetchRecentPlaylistsByGenre } from '../../store/reducers/action-creators/playlist.ts';
import PublicPlaylistList from '../../components/lists/PublicPlaylistList';


function PlaylistsRecentCategoryPage() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["category"]);
    const { id } = useParams<{ id: string }>();
    const genreId = Number(id)

    const dispatch = useAppDispatch();
    const { recentPlaylistsByGenre } = useAppSelector(state => state.playlist);


    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1) {
            dispatch(
                fetchRecentPlaylistsByGenre({
                    genreId,
                    page: currentPage - 1,
                    size: 10,
                })
            );
        }
    }, [dispatch, genreId, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-recent-playlists")}
                </Typography>

                <Box display={"grid"} mt={3} sx={{
                    gridTemplateColumns: "repeat(5, 1fr)"
                }} gap={3}>
                    <PublicPlaylistList playlists={recentPlaylistsByGenre} />
                </Box>
            </Box >

            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage} />
                </Box>
            )
            }
        </>
    );
}

export default PlaylistsRecentCategoryPage;