import {Box, Button, Typography} from "@mui/material";
import TrackSmallItem from "../items/track/TrackSmallItem.tsx";
import { useTranslation } from 'react-i18next';

const tracks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
]

const TrackList = () => {

    const { t } = useTranslation('authorPage')

    return (
        <Box width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"h2"} fontSize={"36px"}>
                    {t("title-popular-tracks")}
                </Typography>
                <Button sx={{
                    height: "32px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 600,
                    color: "black",
                    textTransform: "none"
                }}>
                    {t("button-watch-all")}
                </Button>
            </Box>
            <Box display={"grid"} marginTop={"20px"} sx={{
                gridTemplateColumns: "repeat(2, 1fr)"
            }} gap={3}>
                {tracks.map(track =>
                    <TrackSmallItem key={track} track={track}/>
                )}
            </Box>
        </Box>
    );
};

export default TrackList;