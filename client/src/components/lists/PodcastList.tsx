import {Box, Button, Typography} from "@mui/material";
import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";
import { useTranslation } from 'react-i18next';

const podcasts = [
    "Трек 1",
    "Альбом 2",
    "Трек 3",
    "Альбом 4",
    "Трек 5",
]

const PodcastList = () => {

    const { t } = useTranslation('authorPage')

    return (
        <Box width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"h2"} fontSize={"24px"}>
                    {t("title-collaborations")}
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
            <Box display={"flex"} marginTop={"20px"} gap={3}>
                {podcasts.map((podcast, index) =>
                    index % 2 === 0
                        ?
                        <TrackAverageItem key={index} track={podcast} itemHeight={260}/>
                        :
                        <AlbumAverageItem key={index} album={podcast} itemHeight={260}/>

                )}
            </Box>
        </Box>
    );
};

export default PodcastList;