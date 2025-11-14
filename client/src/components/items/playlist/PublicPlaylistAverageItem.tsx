import { Box, IconButton, Typography } from "@mui/material";
import playImage from "../../../assets/play.svg";
import { useTranslation } from 'react-i18next';
import React, { type FC, useEffect, useState } from "react";
import { usePlayTrack } from "../../../hooks/usePlayTrack.tsx";
import { useAppNavigate } from "../../../hooks/useAppNavigate.ts";
import { PlaylistContextMenu } from "../../contextMenu/PlaylistContextMenu.tsx";
import { useContextMenu } from "../../../hooks/useContextMenu.ts";
import type { PlaylistDto } from "../../../models/PlaylistDto";
import defaultImage from "../../../assets/PlaylistDefaultImage.svg";
import { fetchTracksByPlaylist } from "../../../store/reducers/action-creators/tracks.ts";
import { useAppDispatch } from "../../../hooks/redux.ts";

interface PlaylistItemProps {
    playlist: PlaylistDto;
    itemHeight: number;
    itemWidth?: number;
}

const PublicPlaylistAverageItem: FC<PlaylistItemProps> = ({ playlist, itemHeight, itemWidth }) => {
    const { t } = useTranslation('other');
    const { playTrackList } = usePlayTrack();
    const navigate = useAppNavigate();
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useContextMenu();
    const [wasContextMenuOpen, setWasContextMenuOpen] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (contextMenu) {
            setWasContextMenuOpen(true);
        }
    }, [contextMenu]);

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
    };

    const handlePlaylistClick = () => {
        if (wasContextMenuOpen) {
            setWasContextMenuOpen(false);
            return;
        }
        navigate(`/playlist/${playlist.id}`);
    };

    return (
        <Box
            sx={{
                position: "relative",
                width: itemWidth || "100%",
                height: `${itemHeight}px`,
                display: "flex",
                flexDirection: "column",
                transition: 'height 0.2s ease-in-out',
                '&:hover': {
                    bgcolor: 'rgba(0, 0, 0, 0.04)',
                },
                cursor: 'pointer',
            }}
            onClick={handlePlaylistClick}
        >
            <Box
                onContextMenu={(e) => handleContextMenu(e, playlist.id)}
                width="100%"
                height={`${itemHeight}px`}
                maxWidth={itemWidth}
                borderRadius="10px"
                position="relative"
                sx={{
                    backgroundColor: playlist.imgUrl ? 'transparent' : 'var(--dark-purple)',
                    backgroundImage: playlist.imgUrl || defaultImage ? `url(${playlist.imgUrl || defaultImage})` : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
            </Box>


            <Box
                onContextMenu={(e) => handleContextMenu(e, playlist.id)}
                display={"flex"}
                padding={"24px"}
                position={"absolute"}
                bottom={0}
                height={"88px"}
                width={"100%"}
                maxWidth={itemWidth}
                boxSizing={"border-box"}
                borderRadius={"0 0 10px 10px"}
                sx={{
                    background: "var(--gradient-plashka-purple)",
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center" width={"100%"}>
                    <Box display={"flex"} flexDirection={"column"}>
                        <Typography variant={"mainSbL"} gutterBottom color={"var(--orange-peel)"}>
                            {playlist.title}
                        </Typography>
                        <Typography variant={"mainRM"} color={"var(--columbia-blue)"}>
                            {t("title-playlist")} &middot; {playlist.owner?.name || "Unknown creator"}
                        </Typography>
                    </Box>

                    <IconButton
                        onClick={handlePlayPlaylist}
                        sx={{ padding: 0 }}
                        disableRipple={true}
                    >
                        <Box component={"img"} src={playImage} borderRadius={'50%'} width={"30px"} height={"30px"} />
                    </IconButton>
                </Box>
            </Box>

            <PlaylistContextMenu
                contextMenu={contextMenu}
                onClose={handleCloseContextMenu}
                playlist={playlist}
            />
        </Box>
    );
};

export default PublicPlaylistAverageItem;