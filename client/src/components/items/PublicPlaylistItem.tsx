import React, {FC} from 'react';
import {Box, Card, Typography} from "@mui/material";

interface PlaylistItemProps {
    playlist: string;
    itemWidth: number;
}

const PublicPlaylistItem: FC<PlaylistItemProps> = ({playlist, itemWidth}) => {
    return (
        <Card
            sx={{
                minWidth: itemWidth,
                bgcolor: "#ABA5A5",
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
            }}
        >
            <Box width={itemWidth} height={itemWidth} bgcolor={"white"}>

            </Box>
            <Box mt={1}>
                <Typography gutterBottom variant="h5" fontWeight={600} sx={{ color: "black", fontSize: "14px" }}>
                    {playlist}
                </Typography>
                <Typography variant="body2" fontWeight={400} sx={{ color: "black", fontSize: "12px" }}>
                    Альбом - Rihana
                </Typography>
            </Box>
        </Card>
    );
};

export default PublicPlaylistItem;