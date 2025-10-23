import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import { fetchPersonalAlbumsByGenre } from '../../store/reducers/action-creators/album';
import { useKeycloak } from "@react-keycloak/web";
import AlbumList from '../../components/lists/AlbumList.tsx';

function AlbumPersonalRecommendationsPage() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["main"]);
    const { keycloak } = useKeycloak();

    const dispatch = useAppDispatch();
    const { albumPersonalRecommendationsByGenre } = useAppSelector((state) => state.album);

    const userId = keycloak.authenticated ? keycloak.tokenParsed?.sub : null;

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1 && userId) {
            dispatch(
                fetchPersonalAlbumsByGenre({
                    userId,
                    page: currentPage - 1,
                    size: 10,
                })
            );
        }
    }, [dispatch, currentPage, userId]);

    const shouldShowPagination = totalPages > 1;

    if (!keycloak.authenticated) {
        return (
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-watch-for-you")}
                </Typography>
                <Typography mt={3}>
                    {t("login-required-message")}
                </Typography>
            </Box>
        );
    }

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-watch-for-you")}
                </Typography>

                <Box mt={3}>
                    <AlbumList
                        albums={albumPersonalRecommendationsByGenre}
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

export default AlbumPersonalRecommendationsPage;