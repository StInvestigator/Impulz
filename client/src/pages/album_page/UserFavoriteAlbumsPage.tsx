import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import MyPagination from "../../components/MyPagination";
import AlbumList from "../../components/lists/AlbumList";
import { fetchFavoriteAlbums } from "../../store/reducers/action-creators/album";
import { useTranslation } from "react-i18next";
import { Typography } from "@mui/material";
import keycloak from "../../keycloak.ts";

const UserFavoriteAlbumsPage = () => {
    const { t } = useTranslation(["profile"]);
    const { currentPage, totalPages } = useAppSelector(state => state.page);
    const dispatch = useAppDispatch();
    const { favoriteAlbums, isLoading } = useAppSelector(state => state.album);
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (userId) {
            dispatch(fetchFavoriteAlbums({ userId: userId, page: currentPage - 1, size: 10 }));
        }
    }, [dispatch, userId, currentPage]);


    const shouldShowPagination = totalPages > 1;

    if (isLoading && (!favoriteAlbums || favoriteAlbums.length === 0)) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>Loading albums...</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-liked-albums")}
                </Typography>

                <Box mt={3}>
                    <AlbumList albums={favoriteAlbums}
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

export default UserFavoriteAlbumsPage;