import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useTranslation } from 'react-i18next';
import { useAppNavigate } from "../../../hooks/useAppNavigate.ts";
import React, { type FC } from "react";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import { useAppDispatch } from "../../../hooks/redux.ts";
import { fetchTracksByPlaylist } from "../../../store/reducers/action-creators/tracks.ts";
import type {PlaylistDto} from "../../../models/PlaylistDto.ts";

interface PlaylistItemProps {
    playlist: PlaylistDto
    itemWidth: number;
    color?: "dark" | "light";
}

const PublicPlaylistSmallItem: FC<PlaylistItemProps> = ({ playlist, itemWidth, color = "light" }) => {

    const { t } = useTranslation('other')
    const route = useAppNavigate()
    const { playTrackList } = usePlayTrack();
    const dispatch = useAppDispatch();


    const handlePlayPlaylist = async (e: React.MouseEvent) => {
        e.stopPropagation();

        const result = await dispatch(fetchTracksByPlaylist({
            playlistId: playlist.id,
            page: 0,
            size: 1000
        }));

        if (fetchTracksByPlaylist.fulfilled.match(result)) {
            playTrackList(result.payload, 0);
        }
    }

    return (
        <Box
            onClick={() => route(`/playlist/${playlist.id}`)}
            sx={{
                width: itemWidth,
                boxShadow: "none",
                color: 'black',
                flexShrink: 0,
                padding: "4px",
                cursor: "pointer",
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                }
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
                    backgroundPosition: "center",
                    transition: 'transform 0.2s ease',
                    '&:hover': {
                        transform: 'scale(1.05)',
                    }
                }}
            >
                <IconButton
                    onClick={(e) => {
                        handlePlayPlaylist(e)
                    }}
                    sx={{
                        padding: 0,
                        position: "absolute",
                        bottom: 16,
                        right: 16,
                        transition: 'transform 0.2s ease',
                        '&:hover': {
                            transform: 'scale(1.1)',
                        }
                    }}
                    disableRipple={true}
                >
                    <Box
                        component={"img"}
                        src={playImage}
                        borderRadius={'50%'}
                        width={"30px"}
                        height={"30px"}
                        sx={{ transition: 'transform 0.2s' }}
                    />
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