import type {FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../assets/play.svg";
import medalImage from "../../assets/medal.svg";

interface TrackItemProps {
    track: string;
    itemWidth: number;
}

const TrackItem: FC<TrackItemProps> = ({itemWidth, track}) => {
    return (
        <Box
            sx={{
                width: itemWidth,
            }}
        >
            <Box bgcolor="gray" width="100%" height="178px" borderRadius={"10px 10px 0 0"} position={"relative"}>
                <Box component={"img"} position={"absolute"} right={10} top={10} src={medalImage} borderRadius={'50%'} width={"30px"}
                     height={"30px"}/>
            </Box>
            <Box display={"flex"} justifyContent={"center"} alignItems={"center"} height={"88px"} bgcolor={"white"} px={1} borderRadius={"0 0 10px 10px"}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"}>
                    <Box>
                        <Typography variant={"h3"} gutterBottom sx={{ color: "black"}}>
                            {track}
                        </Typography>
                        <Typography variant={"h4"} sx={{ color: "black"}}>
                            Альбом &middot; Rihana
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

export default TrackItem;