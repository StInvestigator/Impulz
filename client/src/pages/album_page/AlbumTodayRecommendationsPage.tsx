import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import { fetchAlbumTodayRecommendations } from '../../store/reducers/action-creators/album';
import AlbumList from '../../components/lists/AlbumList.tsx';

function AlbumTodayRecommendationsPage() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["main"]);

    const dispatch = useAppDispatch();
    const { albumTodayRecommendations } = useAppSelector((state) => state.album);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1) {
            dispatch(
                fetchAlbumTodayRecommendations({
                    page: currentPage - 1,
                    size: 10,
                })
            );
        }
    }, [dispatch, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-recommendation-today")}
                </Typography>

                <Box mt={3}>
                    <AlbumList albums={albumTodayRecommendations}
                    />
                </Box>
            </Box>

            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage} />
                </Box>
            )}
        </>
    );
}

export default AlbumTodayRecommendationsPage;