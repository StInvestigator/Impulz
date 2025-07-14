import React, {FC} from 'react';
import {Box, Card, CardActionArea, IconButton, Typography} from "@mui/material";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";

interface TrackItemProps {
    track: string;
    itemWidth: number;
}

const TrackItem: FC<TrackItemProps> = ({itemWidth, track}) => {
    return (
        <Card
            sx={{
                minWidth: itemWidth,
                height: 266,
                color: 'white',
                borderRadius: 2,
                flexShrink: 0,
            }}
        >
            <CardActionArea>
                <Box bgcolor="gray" width="100%" height="178px" />
            </CardActionArea>
            <Box display="flex" justifyContent="space-between" alignItems="center" px={2} py={1}>
                <Box>
                    <Typography gutterBottom variant="h5" sx={{ color: "black", fontSize: "14px" }}>
                        {track}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "black", fontSize: "12px" }}>
                        Альбом - Rihana
                    </Typography>
                </Box>
                <IconButton>
                    <PlayCircleIcon />
                </IconButton>
            </Box>
        </Card>
    );
};

export default TrackItem;