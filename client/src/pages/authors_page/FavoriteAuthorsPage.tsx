import { Box, Typography } from "@mui/material";
import MyPagination from "../../components/MyPagination.tsx";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux.ts";
import AuthorList from "../../components/lists/AuthorList.tsx";
import { useTranslation } from "react-i18next";
import keycloak from "../../keycloak.ts";
import { setCurrentPage } from '../../store/reducers/PageSlice';
import { fetchAuthorsByFollower } from "../../store/reducers/action-creators/author.ts";

const FavoriteAuthorsPage = () => {
    const { currentPage, totalPages } = useAppSelector(state => state.page);
    const { t } = useTranslation("profile");

    const dispatch = useAppDispatch();
    const { authorsByFollower } = useAppSelector(state => state.author);

    useEffect(() => {
        dispatch(setCurrentPage(1));
    }, [dispatch]);

    useEffect(() => {
        if (keycloak.tokenParsed?.sub) {
            dispatch(fetchAuthorsByFollower({ followerId: keycloak.tokenParsed?.sub, page: currentPage - 1, size: 10 }));
        }
    }, [dispatch, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    {t("title-liked-authors")}
                </Typography>

                <Box mt={3}>
                    <AuthorList authors={authorsByFollower} />
                </Box>
            </Box>
            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage} />
                </Box>
            )}
        </>
    );
};

export default FavoriteAuthorsPage;