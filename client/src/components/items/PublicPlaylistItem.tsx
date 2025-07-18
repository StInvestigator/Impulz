import React, {FC} from 'react';
import {Box, Card, IconButton, Typography} from "@mui/material";
import playImage from "../../images/play.svg";

interface PlaylistItemProps {
    playlist: string;
    itemWidth: number;
}

const PublicPlaylistItem: FC<PlaylistItemProps> = ({playlist, itemWidth}) => {
    return (
        <Box
            sx={{
                width: itemWidth,
                bgcolor: "#ABA5A5",
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
            }}
        >
            <Box position={"relative"} width={itemWidth} height={itemWidth} bgcolor={"white"} borderRadius={"10px"}>
                <IconButton sx={{
                    padding: 0,
                    position: "absolute",
                    top: 80,
                    left: 80,
                }}>
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                         height={"30px"}/>
                </IconButton>
            </Box>
            <Box mt={1}>
                <Typography gutterBottom variant="h3" fontWeight={600} sx={{ color: "black" }}>
                    {playlist}
                </Typography>
                <Typography variant="h4" fontWeight={400} sx={{ color: "black"}}>
                    Альбом &middot; Rihana
                </Typography>
            </Box>
        </Box>
    );
};

export default PublicPlaylistItem;