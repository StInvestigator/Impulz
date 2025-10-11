import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../../components/lists/TrackList";
import MyPagination from "../../components/MyPagination";
import type {TrackSimpleDto} from "../../models/DTO/track/TrackSimpleDto.ts";
import type {AuthorSimpleDto} from "../../models/DTO/AuthorSimpleDto.ts";
import {useAppSelector} from "../../hooks/redux.ts";

const authors: AuthorSimpleDto[] = [
    {
        id: "1",
        name: "Автор 1",
        imgUrl: ""
    },
    {
        id: "1",
        name: "Автор 2",
        imgUrl: ""
    },
];


const favoriteTracks: TrackSimpleDto[] = [
    {
        id: 1,
        title: "Назва треку 1",
        album: "Альбом 1",
        albumId: 1,
        authors: [authors[0]],
        durationSec: 180,
        imgUrl: ""
    },
    {
        id: 2,
        title: "Назва треку 2",
        album: "Альбом 2",
        albumId: 2,
        authors: [authors[1]],
        durationSec: 210,
        imgUrl: ""
    }
];

export default function FavoriteTracksPage() {
    const { currentPage } = useAppSelector(state => state.page);

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
                <MyPagination totalPages={30} currentPage={currentPage}/>
            </Box>
        </>
    );
}
