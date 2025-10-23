import { Box } from "@mui/material";
import MyPagination from "../../components/MyPagination.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import { fetchSimilarAuthorsByGenre } from "../../store/reducers/action-creators/author.ts";
import { useParams } from "react-router-dom";
import AuthorList from "../../components/lists/AuthorList.tsx";
import { useTranslation } from "react-i18next";
import { setCurrentPage } from '../../store/reducers/PageSlice';

const SimilarAuthorsPage = () => {

    const { currentPage, totalPages } = useAppSelector(state => state.page);
    const { id } = useParams<{ id: string }>();
    const { t } = useTranslation("authorPage");
    const dispatch = useAppDispatch();
    const { similarAuthors } = useAppSelector(state => state.author);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch, id]);

    useEffect(() => {
        if (id) {
            dispatch(fetchSimilarAuthorsByGenre({ authorId: id, page: currentPage - 1, size: 20 }));
        }
    }, [dispatch, currentPage, id]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <h2>{t("title-similar-author")}</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AuthorList authors={similarAuthors} />
            </Box>
            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage} />
                </Box>
            )}
        </>
    );
};

export default SimilarAuthorsPage;