import type {FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import medalImage from "../../../assets/medal.svg";
import { useTranslation } from 'react-i18next';

interface TrackItemProps {
    track: string;
    itemHeight: number;
    itemWidth?: number;
    isMedal?: boolean;
}

const TrackAverageItem: FC<TrackItemProps> = ({itemWidth, itemHeight, track, isMedal}) => {

    const { t } = useTranslation('other')

    return (
        <Box
            sx={{
                width: itemWidth || "100%"
            }}
        >
            <Box bgcolor="gray" width="100%" height={`${itemHeight - 88}px`} borderRadius={"10px 10px 0 0"} position={"relative"}>
                {
                    isMedal
                    &&
                    <Box component={"img"} position={"absolute"} right={10} top={10} src={medalImage} borderRadius={'50%'} width={"30px"}
                         height={"30px"}/>
                }
            </Box>
            <Box display={"flex"} padding={"24px 12px"} height={"88px"} boxSizing={"border-box"} bgcolor={"#B9B9B9"} borderRadius={"0 0 10px 10px"}>
                <Box display="flex" alignItems="center" width={"100%"}>
                    <Box display="flex" flexDirection="column" flexGrow={1}>
                        <Typography variant={"mainSbL"} gutterBottom sx={{ color: "black"}}>
                            {track}
                        </Typography>
                        <Typography variant={"mainRM"} sx={{ color: "black"}}>
                            {t("title-album")} &middot; Rihana
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

export default TrackAverageItem;