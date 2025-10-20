import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import MyPagination from "../../components/MyPagination";
import AlbumList from "../../components/lists/AlbumList";
import { fetchAuthorAlbumCollaborations } from "../../store/reducers/action-creators/album";
import {useTranslation} from "react-i18next";


const ColaborationInAuthorPage = () => {
    const {currentPage, totalPages} = useAppSelector(state => state.page);
    const {id} = useParams<{ id:string }>();
    const {t} = useTranslation("authorPage");

    const dispatch = useAppDispatch();
    const { authorCollaborationsAlbums } = useAppSelector(state => state.album);

    useEffect(() => {
        if (id){
            dispatch(fetchAuthorAlbumCollaborations({ authorId: id, page: currentPage - 1, size: 10 }));
        }
    }, [dispatch, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>
            <h2>{t("title-author-collaborations")}</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AlbumList albums={authorCollaborationsAlbums}/>
            </Box>
            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage}/>
                </Box>
            )}
        </>
    );
}

export default ColaborationInAuthorPage
