import {Box} from "@mui/material";
// import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";
import type {TrackSimpleDto} from "../../models/DTO/TrackSimpleDto.ts";

const podcasts: TrackSimpleDto[] = [
    {
        id: 1,
        title: "Трек 1",
        durationSec: 240,
        imgUrl: "",
        authors: ["Автор 1", "Автор 2"],
        album: "Альбом 1"
    },
    {
        id: 2,
        title: "Трек 2",
        durationSec: 180,
        imgUrl: "",
        authors: ["Автор 3"],
        album: "Альбом 2"
    },
    {
        id: 3,
        title: "Трек 3",
        durationSec: 300,
        imgUrl: "",
        authors: ["Автор 4", "Автор 5"],
        album: "Альбом 3"
    },
    {
        id: 4,
        title: "Трек 4",
        durationSec: 210,
        imgUrl: "",
        authors: ["Автор 6"],
        album: "Альбом 4"
    }
]


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