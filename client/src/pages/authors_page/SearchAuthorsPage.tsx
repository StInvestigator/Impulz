import { Box } from "@mui/material";
import MyPagination from "../../components/MyPagination.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { useParams } from "react-router-dom";
import AuthorList from "../../components/lists/AuthorList.tsx";
import { useTranslation } from "react-i18next";
import { searchAuthors } from "../../store/reducers/action-creators/search";
import { selectAuthorsResults } from "../../store/reducers/SearchSlice.ts";
import { setCurrentPage } from '../../store/reducers/PageSlice';

const SearchAuthorsPage = () => {
    const { currentPage, totalPages } = useAppSelector(state => state.page);
    const { query } = useParams<{ query: string }>();
    const { t } = useTranslation("search");

    const dispatch = useAppDispatch();
    const authors = useAppSelector(selectAuthorsResults);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch, query]);

    useEffect(() => {
        if (query) {
            dispatch(searchAuthors({ query: query, page: currentPage - 1, size: 10 }));
        }
    }, [dispatch, currentPage, query]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <h2>{t("title-authors")}</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AuthorList authors={authors} />
            </Box>
            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage} />
                </Box>
            )}
        </>
    );
};

export default SearchAuthorsPage;