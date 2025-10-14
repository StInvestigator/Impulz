import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../components/lists/TrackList";
import MyPagination from "../components/MyPagination";
import {useAppSelector} from "../hooks/redux.ts";
import type {TrackSimpleDto} from "../models/DTO/track/TrackSimpleDto.ts";

const favoriteTracks: TrackSimpleDto[] = [
    {
        id: 1,
        title: "Назва треку 1",
        album: "Альбом 1",
        albumId: 1,
        authors: [
            {
                id: "1",
                name: "Автор 1",
                imgUrl: ""
            }
        ],
        durationSec: 180,
        imgUrl: ""
    },
    {
        id: 2,
        title: "Назва треку 2",
        album: "Альбом 2",
        albumId: 2,
        authors: [
            {
                id: "1",
                name: "Автор 2",
                imgUrl: ""
            }
        ],
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
                <MyPagination currentPage={currentPage} totalPages={30}/>
            </Box>
        </>
    );
}
