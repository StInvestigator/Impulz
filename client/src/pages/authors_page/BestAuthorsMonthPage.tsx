import { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { useTranslation } from 'react-i18next';
import { fetchTopAuthorsByMonth } from '../../store/reducers/action-creators/author';
import { Box } from '@mui/material';
import AuthorList from '../../components/lists/AuthorList';
import MyPagination from '../../components/MyPagination';
import { setCurrentPage } from '../../store/reducers/PageSlice';

function BestAuthorsMonthPage() {
    const {currentPage, totalPages} = useAppSelector(state => state.page);
    const {t} = useTranslation("main");

    const dispatch = useAppDispatch();
    const { topAuthors } = useAppSelector(state => state.author);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (currentPage >= 1) {
            dispatch(fetchTopAuthorsByMonth({page: currentPage - 1, size: 5 }));
        }
    }, [dispatch, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <h2>{t("title-best-author-month")}</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AuthorList authors={topAuthors}/>
            </Box>
            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage}/>
                </Box>
            )}
        </>
    );
}

export default BestAuthorsMonthPage