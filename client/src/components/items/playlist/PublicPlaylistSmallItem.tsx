import type {FC} from "react";
import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useTranslation } from 'react-i18next';

interface PlaylistItemProps {
    playlist: string;
    itemWidth: number;
}

const PublicPlaylistSmallItem: FC<PlaylistItemProps> = ({playlist, itemWidth}) => {

    const { t } = useTranslation('other')

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
            <Box display="flex" flexDirection="column" flexGrow={1} mt={1}>
                <Typography gutterBottom variant="mainSbL">
                    {playlist}
                </Typography>
                <Typography variant="mainRM">
                    {t("title-album")} &middot; Rihana
                </Typography>
            </Box>
        </Box>
    );
};

export default PublicPlaylistSmallItem;