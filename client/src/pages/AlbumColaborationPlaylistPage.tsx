import {Box, Pagination} from "@mui/material";
import AlbumColaborationPlaylistList from "../components/lists/AlbumColaborationPlaylistList.tsx";
import MyPagination from "../components/MyPagination.tsx";
import {useState} from "react";

const AlbumColaborationPlaylistPage = () => {

    const [page, setPage] = useState(1)

    return (
        <>
            <h2>Альбоми | Колаборації | Плейлисти</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AlbumColaborationPlaylistList/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={page} onPageChange={setPage}/>
            </Box>
        </>
    );
};

export default AlbumColaborationPlaylistPage;