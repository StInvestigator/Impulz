import MyPagination from "../components/MyPagination.tsx";
import {useState} from "react";
import {Box, Stack} from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import Cover from "../components/Cover.tsx";

const PlaylistItemPage = () => {
    const [page, setPage] = useState(1)

    return (
        <>
            <Box component={"section"}>
                <Cover type={"myPlaylist"}/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <Stack spacing={3}>
                    <TrackList/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination currentPage={page} onPageChange={setPage} totalPages={30}/>
            </Box>
        </>
    );
};

export default PlaylistItemPage;