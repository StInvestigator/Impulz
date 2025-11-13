import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import MyPagination from "../../components/MyPagination.tsx";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.ts";
import { fetchAllPlaylistsDtoOwnByUserId } from "../../store/reducers/action-creators/playlist.ts";
import PublicPlaylistList from "../../components/lists/PublicPlaylistList.tsx";
import { useTranslation } from "react-i18next";

const UserPlaylistsPage = () => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile);
    const { allPlaylistsDtoOwnByUser, isLoading, error } = useAppSelector(state => state.playlist);
    const { currentPage, totalPages } = useAppSelector(state => state.page);
    const { t } = useTranslation(["profile", "other"]);

    useEffect(() => {
        if (profile?.id) {
            dispatch(fetchAllPlaylistsDtoOwnByUserId({
                userId: profile.id,
                page: currentPage - 1,
                size: 10
            }));
        }
    }, [dispatch, profile?.id, currentPage]);

    const shouldShowPagination = totalPages > 1;

    if (isLoading && (!allPlaylistsDtoOwnByUser || allPlaylistsDtoOwnByUser.length === 0)) {
        return (
            <Box sx={{ p: 4, display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '300px' }}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box sx={{ p: 2, backgroundColor: '#ffebee', borderRadius: 1 }}>
                <Typography color="error">Error: {error}</Typography>
            </Box>
        );
    }

    if (!allPlaylistsDtoOwnByUser || allPlaylistsDtoOwnByUser.length === 0) {
        return (
            <Box sx={{ p: 4, textAlign: 'center' }}>
                <Typography>No playlists found</Typography>
            </Box>
        );
    }

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("profile:title-playlists")}
                </Typography>

                <Box display={"grid"} mt={3} sx={{
                    gridTemplateColumns: "repeat(5, 1fr)"
                }} gap={3}>
                    <PublicPlaylistList playlists={allPlaylistsDtoOwnByUser} />
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
};

export default UserPlaylistsPage;
