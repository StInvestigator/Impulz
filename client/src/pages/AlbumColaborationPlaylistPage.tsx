import {Box} from "@mui/material";
import AlbumColaborationPlaylistList from "../components/lists/AlbumColaborationPlaylistList.tsx";
import MyPagination from "../components/MyPagination.tsx";
import {useAppSelector} from "../hooks/redux.ts";

const AlbumColaborationPlaylistPage = () => {
    const { currentPage } = useAppSelector(state => state.page);

    return (
        <>
            <h2>Альбоми | Колаборації | Плейлисти</h2>
            <Box component={"section"} marginTop={"20px"} >
                <AlbumColaborationPlaylistList/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={currentPage}/>
            </Box>
        </>
    );
};

export default AlbumColaborationPlaylistPage;