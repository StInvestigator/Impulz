import {Box} from "@mui/material";
import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";

const podcasts = [
    "Трек 1",
    "Альбом 2",
    "Трек 3",
    "Альбом 4",
    "Трек 5",
]

const PodcastList = () => {

    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {podcasts.map((podcast, index) =>
                index % 2 === 0
                    ?
                    <TrackAverageItem key={index} track={podcast} itemHeight={260}/>
                    :
                    <AlbumAverageItem key={index} album={podcast} itemHeight={260}/>

            )}
        </Box>
    );
};

export default PodcastList;