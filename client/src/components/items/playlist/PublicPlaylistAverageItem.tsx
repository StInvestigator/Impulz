import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import type {FC} from "react";
import { useTranslation } from 'react-i18next';
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto";
import playlistImage from "../../../assets/sidebar/playlistImage.svg"

interface PlaylistItemProps {
    playlist: PlaylistSimpleDto;
    itemHeight: number;
}

const PublicPlaylistAverageItem: FC<PlaylistItemProps> = ({playlist, itemHeight}) => {

    const { t } = useTranslation('other')

    return (
        <Box
            sx={{
                width: "100%",
            }}
        >
            <Box
                width="100%"
                height={`${itemHeight - 88}px`}
                borderRadius={"10px 10px 0 0"}
                position={"relative"}
                sx={{
                    overflow: 'hidden',
                }}
            >
                <Box
                    component="img"
                    src={playlist.imgUrl || playlistImage}
                    width="100%"
                    height="100%"
                    sx={{
                        objectFit: 'cover',
                        display: 'block',
                    }}
                />
            </Box>
            <Box display={"flex"} padding={"24px"} height={"88px"} boxSizing={"border-box"} borderRadius={"0 0 10px 10px"} sx={{
                background: "var(--gradient-plashka-purple)",
            }}>
                <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant={"mainSbL"} gutterBottom sx={{ color: "black"}}>
                            {playlist.title}
                        </Typography>
                        <Typography variant={"mainRM"} sx={{ color: "black"}}>
                            {t("title-album")} &middot; {playlist.owner.name || "Unknown"}
                        </Typography>
                    </Box>
                    <IconButton
                        sx={{padding: 0}}
                        disableRipple={true}
                    >
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                             height={"30px"}/>
                    </IconButton>
                </Box>
            </Box>
        </Box>
    );
};

export default PublicPlaylistAverageItem;