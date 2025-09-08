import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../../components/lists/TrackList";
import MyPagination from "../../components/MyPagination";
import type {TrackSimpleDto} from "../../models/DTO/TrackSimpleDto.ts";
import { useState } from "react";

const favoriteTracks: TrackSimpleDto[] = [
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

export default function FavoriteTracksPage() {
    const [page, setPage] = useState(1);
    
    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    Улюблені треки
                </Typography>
                <Stack spacing={3} mt={3}>
                    <TrackList tracks={favoriteTracks}/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination totalPages={30} currentPage={page} onPageChange={setPage}/>
            </Box>
        </>
    );
}
