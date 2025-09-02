import MyPagination from "../components/MyPagination.tsx";
import {useState} from "react";
import {Box, Stack} from "@mui/material";
import TrackList from "../components/lists/TrackList.tsx";
import Cover from "../components/Cover.tsx";
import type {TrackSimpleDto} from "../models/DTO/TrackSimpleDto.ts";

const tracks: TrackSimpleDto[] = [
    {
        id: 1,
        title: "Назва треку 1",
        album: "123",
        authors: ["Автор 1"],
        durationSec: 180,
        imgUrl: ""
    },
    {
        id: 2,
        title: "Назва треку 2",
        album: "123",
        authors: ["Автор 2"],
        durationSec: 210,
        imgUrl: ""
    }
];

const PlaylistItemPage = () => {
    const [page, setPage] = useState(1)

    return (
        <>
            <Box component={"section"}>
                <Cover type={"myPlaylist"}/>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <Stack spacing={3}>
                    <TrackList tracks={tracks}/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination currentPage={page} onPageChange={setPage} totalPages={30}/>
            </Box>
        </>
    );
};

export default PlaylistItemPage;