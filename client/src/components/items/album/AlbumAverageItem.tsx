import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import type {FC} from "react";
import type { AlbumSimpleDto } from "../../../models/DTO/AlbumSimpleDto";

interface AlbumItemProps {
    album: AlbumSimpleDto;
    itemHeight: number;
    itemWidth: number;
    color?: "dark" | "light";
}

const AlbumAverageItem: FC<AlbumItemProps> = ({album, itemHeight,itemWidth, color = "light"}) => {

    
    return (
        <Box
            sx={{
                width: "100%",
            }}

        >
            <Box bgcolor="gray" width="100%" height={`${itemHeight - 88}px`} maxWidth={itemWidth} borderRadius={"10px 10px 0 0"} position={"relative"}>

            </Box>
            <Box display={"flex"} padding={"24px"} height={"88px"} maxWidth={itemWidth} boxSizing={"border-box"} bgcolor={"#B9B9B9"} borderRadius={"0 0 10px 10px"}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"} color={color === "dark" ? "var(--dark-purple)" : "var(--orange-peel)"}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant={"mainSbL"} gutterBottom sx={{ color: "black"}}>
                            {album.title}
                        </Typography>
                        <Typography variant={"mainRM"} sx={{ color: "black"}}>
                            {album.authors?.map(author => author.name).join(", ") || "Unknown"}
                        </Typography>
                    </Box>
                    <IconButton sx={{padding: 0}}>
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                             height={"30px"}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default AlbumAverageItem;