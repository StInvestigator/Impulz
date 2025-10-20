import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import PublicPlaylistList from '../../components/lists/PublicPlaylistList';
import { searchPublicPlaylists } from "../../store/reducers/action-creators/search";
import { selectPlaylistsResults } from "../../store/reducers/SearchSlice.ts";

function SearchPlaylistsPage() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["search"]);
    const { query } = useParams<{ query: string }>();

    const dispatch = useAppDispatch();
    const playlists = useAppSelector(selectPlaylistsResults);


    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [query, dispatch]);

    useEffect(() => {
        if (query && currentPage >= 1) {
            dispatch(
                searchPublicPlaylists({
                    query: query,
                    page: currentPage - 1,
                    size: 10,
                })
            );
        }
    }, [dispatch, query, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-playlists")}
                </Typography>

                <Box display={"grid"} mt={3} sx={{
                    gridTemplateColumns: "repeat(5, 1fr)"
                }} gap={3}>
                    <PublicPlaylistList playlists={playlists} />
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

export default SearchPlaylistsPage;