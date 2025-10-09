import {Box} from "@mui/material";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";
import type {AuthorSimpleDto} from "../../models/DTO/AuthorSimpleDto.ts";
import type {TrackSimpleDto} from "../../models/DTO/track/TrackSimpleDto.ts";

const authors: AuthorSimpleDto[] = [
    {
        id: "1",
        name: "Автор 1",
        imgUrl: ""
    },
    {
        id: "2",
        name: "Автор 2",
        imgUrl: ""
    },
];


const podcasts: TrackSimpleDto[] = [
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


const PodcastList = () => {

    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {podcasts.map((podcast, index) =>
                // index % 2 === 0
                    // ?
                    <TrackAverageItem key={index} track={podcast} itemHeight={260}/>
                    // :
                    // <AlbumAverageItem key={index} album={podcast.album} itemHeight={260}/>

            )}
        </Box>
    );
};

export default PodcastList;