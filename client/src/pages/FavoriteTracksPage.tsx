import { Box, Stack, Typography } from "@mui/material";
import TrackList from "../components/lists/TrackList";
import MyPagination from "../components/MyPagination";
import { useState } from "react";


export default function FavoriteTracksPage() {
    const [page, setPage] = useState(1)

    return (
        <>
            <Box component={"section"}>
                <Typography variant="h2">
                    Улюблені треки
                </Typography>
                <Stack spacing={3} mt={3}>
                    <TrackList/>
                </Stack>
            </Box>
            <Box component={"section"} marginTop={"60px"}>
                <MyPagination currentPage={page} onPageChange={setPage} totalPages={30}/>
            </Box>
        </>
    );
}
