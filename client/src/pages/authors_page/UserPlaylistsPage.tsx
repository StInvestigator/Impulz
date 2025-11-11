import { useEffect } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import PublicPlaylistAverageItem from "../../components/items/playlist/PublicPlaylistAverageItem.tsx";
import MyPagination from "../../components/MyPagination.tsx";
import { useAppSelector, useAppDispatch } from "../../hooks/redux.ts";
import { fetchAllPlaylistsDtoOwnByUserId } from "../../store/reducers/action-creators/playlist.ts";

const UserPlaylistsPage = () => {
    const dispatch = useAppDispatch();
    const { profile } = useAppSelector(state => state.profile);
    const { allPlaylistsDtoOwnByUser, isLoading, error } = useAppSelector(state => state.playlist);
    const { currentPage, totalPages } = useAppSelector(state => state.page);

    useEffect(() => {
        if (profile?.id) {
            dispatch(fetchAllPlaylistsDtoOwnByUserId({
                userId: profile.id,
                page: currentPage - 1,
                size: 4
            }));
        }
    }, [dispatch, profile?.id, currentPage]);


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
        <Box sx={{ p: 3 }}>
            <Box
                display="grid"
                gridTemplateColumns="repeat(auto-fill, minmax(300px, 1fr))"
                gap={3}
            >
                {allPlaylistsDtoOwnByUser.map((playlist) => (
                    <PublicPlaylistAverageItem
                        key={playlist.id}
                        playlist={playlist}
                        itemHeight={360}
                    />
                ))}
            </Box>

            {totalPages > 1 && (
                <Box component="section" marginTop={4} display="flex" justifyContent="center">
                    <MyPagination
                        totalPages={totalPages}
                        currentPage={currentPage}
                    />
                </Box>
            )}
        </Box>
    );
};

export default UserPlaylistsPage;
