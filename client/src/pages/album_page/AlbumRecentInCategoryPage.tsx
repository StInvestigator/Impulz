import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux.ts';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice.ts';
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination.tsx';
import { fetchRecentAlbumsByGenre } from '../../store/reducers/action-creators/album.ts';
import AlbumList from '../../components/lists/AlbumList.tsx';

function AlbumRecentInCategoryPage() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["category"]);
    const { id } = useParams<{ id: string }>();
    const genreId = Number(id)

    const dispatch = useAppDispatch();
    const { recentAlbumsByGenre } = useAppSelector(state => state.album);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1) {
            dispatch(
                fetchRecentAlbumsByGenre({
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
                    {t("title-recent-albums")}
                </Typography>

                <Box mt={3}>
                    <AlbumList
                        albums={recentAlbumsByGenre}
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

export default AlbumRecentInCategoryPage;