import {Box} from "@mui/material";
import TrackSmallItem from "../items/track/TrackSmallItem.tsx";

const tracks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
]

const TrackList = () => {


    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(2, 1fr)"
        }} gap={3}>
            {tracks.map(track =>
                <TrackSmallItem key={track} track={track}/>
            )}
        </Box>
    );
};

export default TrackList;