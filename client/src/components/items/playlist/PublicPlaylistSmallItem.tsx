import {Box, IconButton, Typography} from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useTranslation } from 'react-i18next';
import {useAppNavigate} from "../../../hooks/useAppNavigate.ts";
import type { PlaylistSimpleDto } from "../../../models/DTO/PlaylistSimpleDto.ts";
import type {FC} from "react";

interface PlaylistItemProps {
    playlist: PlaylistSimpleDto;
    itemWidth: number;
    color?: "dark" | "light";
}

const PublicPlaylistSmallItem: FC<PlaylistItemProps> = ({playlist, itemWidth, color = "light"}) => {

    const { t } = useTranslation('other')
    const route = useAppNavigate()

    return (
        <Box
            onClick={() => route(`/playlist/${playlist.id}`)}
            sx={{
                width: itemWidth,
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
                cursor: "pointer",
                transition: 'background-color 0.3s ease',

            }}
        >
            <Box
                position="relative"
                width={itemWidth}
                height={itemWidth}
                bgcolor={"white"}
                borderRadius={"10px"}
                sx={{
                    backgroundImage: `url(${playlist.imgUrl})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center"
                }}
            >
                <IconButton
                    onClick={(e) => {
                        e.stopPropagation()
                    }}
                    sx={{
                        padding: 0,
                        position: "absolute",
                        bottom: 16,
                        right: 16
                    }}
                >
                    <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"}
                         height={"30px"}/>
                </IconButton>
            </Box>

            <Box display="flex" flexDirection="column" flexGrow={1} mt={1} color={color === "dark" ? "var(--dark-purple)" : "var(--orange-peel)"}>
                <Typography gutterBottom variant="mainSbL" sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {playlist.title}
                </Typography>
                <Typography variant="mainRM" sx={{
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                }}>
                    <Box>
                        {t("title-playlist")}
                    </Box>
                    <Box component="span" sx={{ fontSize: '20px', lineHeight: 1 }}>
                        &middot;
                    </Box>
                    <Box>
                        {playlist.owner?.name || "Unknown"}
                    </Box>
                </Typography>
            </Box>
        </Box>
    );
};

export default PublicPlaylistSmallItem;