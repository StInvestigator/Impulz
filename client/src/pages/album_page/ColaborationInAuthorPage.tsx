import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import MyPagination from "../../components/MyPagination";
import AlbumList from "../../components/lists/AlbumList";
import { fetchAuthorAlbumCollaborations } from "../../store/reducers/action-creators/album";


const ColaborationInAuthorPage = () => {
    const {currentPage, totalPages} = useAppSelector(state => state.page);
    const {id} = useParams<{ id:string }>();

    const dispatch = useAppDispatch();
    const { authorCollaborationsAlbums } = useAppSelector(state => state.album);

    useEffect(() => {
        if (id){
            dispatch(fetchAuthorAlbumCollaborations({ authorId: id, page: currentPage - 1, size: 20 }));
        }
    }, [dispatch, currentPage]);

    return (
        <>
            <h2>Колаборації автора</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AlbumList albums={authorCollaborationsAlbums}/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={totalPages} currentPage={currentPage}/>
            </Box>
        </>
    );
}

export default ColaborationInAuthorPage
