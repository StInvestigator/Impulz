import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import { searchAlbums } from "../../store/reducers/action-creators/search";
import { useParams } from "react-router-dom";
import AlbumList from '../../components/lists/AlbumList.tsx';
import { selectAlbumsResults } from "../../store/reducers/SearchSlice.ts";

function SearchAlbumsPage() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["search"]);
    const { query } = useParams<{ query: string }>();

    const dispatch = useAppDispatch();
    const albums = useAppSelector(selectAlbumsResults);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1 && query) {
            dispatch(
                searchAlbums({
                    query: query,
                    page: currentPage - 1,
                    size: 10,
                })
            );
        }
    }, [dispatch, currentPage, query]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-albums")}
                </Typography>

                <Box mt={3}>
                    <AlbumList albums={albums}
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

export default SearchAlbumsPage;