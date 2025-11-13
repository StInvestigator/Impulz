import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import MyPagination from "../../components/MyPagination";
import AlbumList from "../../components/lists/AlbumList";
import { fetchUnreleasedAlbumsByAuthor } from "../../store/reducers/action-creators/album";
import {useTranslation} from "react-i18next";


const AlbumsUnreleasedPage = () => {
    const {currentPage, totalPages} = useAppSelector(state => state.page);
    const {id} = useParams<{ id:string }>();
    const {t} = useTranslation(["officeArtistPage"]);

    const dispatch = useAppDispatch();
    const { unreleasedAuthorAlbums } = useAppSelector(state => state.album);

    useEffect(() => {
        if (id){
            dispatch(fetchUnreleasedAlbumsByAuthor({ authorId: id, page: currentPage - 1, size: 10 }));
        }
    }, [dispatch, currentPage]);

    const shouldShowPagination = totalPages > 1;

    return (
        <>`
            <h2>{t("title-unreleased-albums")}</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AlbumList albums={unreleasedAuthorAlbums}/>
            </Box>
            {shouldShowPagination && (
                <Box component={"section"} marginTop={"60px"}>
                    <MyPagination totalPages={totalPages} currentPage={currentPage}/>
                </Box>
            )}
        </>
    );
}

export default AlbumsUnreleasedPage
