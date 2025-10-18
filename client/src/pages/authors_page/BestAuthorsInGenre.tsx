import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { useParams } from "react-router-dom";
import { Box, Typography } from '@mui/material';
import MyPagination from '../../components/MyPagination';
import { fetchTopAuthorsInGenre } from '../../store/reducers/action-creators/author.ts';
import AuthorList from '../../components/lists/AuthorList';

function BestAuthorsInGenre() {
    const { currentPage, totalPages } = useAppSelector((state) => state.page);
    const { t } = useTranslation(["category"]);
    const { id } = useParams<{ id: string }>();
    const genreId = Number(id)

    const dispatch = useAppDispatch();
    const { topAuthorsInGenre } = useAppSelector(state => state.author);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1) {
            dispatch(
                fetchTopAuthorsInGenre({
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
                    {t("title-best-author-genre")}
                </Typography>

                <Box mt={3}>
                    <AuthorList authors={topAuthorsInGenre}/>
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

export default BestAuthorsInGenre;