import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import Box from "@mui/material/Box";
import MyPagination from "../../components/MyPagination";
import AlbumList from "../../components/lists/AlbumList";
import { fetchAlbumsByAuthor } from "../../store/reducers/action-creators/album";


const AlbumsInAuthorPage = () => {
    // const {currentPage, totalPages} = useAppSelector(state => state.page);
    const [page, setPage] = useState(1);
    const {id} = useParams<{ id:string }>();

    const dispatch = useAppDispatch();
    const { albums } = useAppSelector(state => state.album);

    useEffect(() => {
        if (id){
            dispatch(fetchAlbumsByAuthor({ authorId: id, page: page - 1, size: 20 }));
        }
    }, [dispatch, page]);

    return (
        <>
            <h2>Популярні альбоми автора</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AlbumList albums={albums}/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={page} onPageChange={setPage}/>
            </Box>
        </>
    );
}

export default AlbumsInAuthorPage
