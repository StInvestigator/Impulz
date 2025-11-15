import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { fetchTopAuthorsByMonth } from '../../store/reducers/action-creators/author';
import { Box, Typography } from '@mui/material';
import AuthorList from '../../components/lists/AuthorList';
import MyPagination from '../../components/MyPagination';
import { setCurrentPage } from '../../store/reducers/PageSlice';

function BestAuthorsMonthPage() {
    const { currentPage, totalPages } = useAppSelector(state => state.page);
    const { t } = useTranslation("main");

    const dispatch = useAppDispatch();
    const { topAuthors } = useAppSelector(state => state.author);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1) {
            dispatch(fetchTopAuthorsByMonth({ page: currentPage - 1, size: 5 }));
        }
    }, [dispatch, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-best-author-month")}
                </Typography>

                <Box mt={3}>
                    <AuthorList authors={topAuthors} />
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

export default BestAuthorsMonthPage