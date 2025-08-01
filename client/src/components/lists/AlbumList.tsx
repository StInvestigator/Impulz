import {Box, Button, Typography} from "@mui/material";
import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
import { useTranslation } from 'react-i18next';

const albums = [
    "Альбом 1",
    "Альбом 2",
    "Альбом 3",
    "Альбом 4",
    "Альбом 5",
]

const AlbumList = () => {
    
    const { t } = useTranslation('authorPage')

    return (
        <Box width={"100%"}>
            <Box display={"flex"} justifyContent={"space-between"} alignItems={"center"}>
                <Typography variant={"h2"} fontSize={"24px"}>
                    {t("title-albums")}
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
                {albums.map(album =>
                    <AlbumAverageItem key={album} album={album} itemHeight={360}/>
                )}
            </Box>
        </Box>
    );
};

export default AlbumList;