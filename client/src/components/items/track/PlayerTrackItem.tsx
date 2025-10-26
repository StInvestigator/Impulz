import {Box, IconButton, Typography} from '@mui/material';
import type {TrackSimpleDto} from "../../../models/DTO/track/TrackSimpleDto.ts";
import AdditionalIcon from "../../../assets/AdditionalIcon.svg";
import { formatTime } from '../../../utils/timeFormatter';
import {PlayerTrackContextMenu} from "../../contextMenu/PlayerTrackContextMenu.tsx";
import {useMediaContextMenu} from "../../../hooks/useMediaContextMenu.ts";
import {useEffect, useState} from "react";

interface PlayerTrackItemProps {
    track: TrackSimpleDto;
    index: number;
    currentTrackIndex: number;
    isActive?: boolean;
    onTrackClick?: () => void;
    onCloseFullScreen?: () => void;
}

export const PlayerTrackItem = ({
                                    track,
                                    index,
                                    currentTrackIndex,
                                    onTrackClick,
                                    onCloseFullScreen
                                }: PlayerTrackItemProps) => {
    const isCurrentTrack = index === currentTrackIndex;
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useMediaContextMenu();
    const [wasContextMenuOpen, setWasContextMenuOpen] = useState(false);

    useEffect(() => {
        if (contextMenu) {
            setWasContextMenuOpen(true);
        }
    }, [contextMenu]);

    const handleIconClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        handleContextMenu(e, track.id);
    };

    const handleTrackClick = () => {
        if (wasContextMenuOpen) {
            setWasContextMenuOpen(false);
            return;
        }

        if (onTrackClick) {
            onTrackClick();
        }
    };

    return (
        <Box
            onClick={handleTrackClick}
            sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 2,
                p: 1,
                borderRadius: '8px',
                margin: '0 8px 8px 8px',
                backgroundColor: isCurrentTrack ? 'rgba(255,107,53,0.2)' : 'transparent',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
                '&:hover': {
                    backgroundColor: isCurrentTrack
                        ? 'rgba(255,107,53,0.3)'
                        : 'rgba(255,255,255,0.08)',
                }
            }}
        >
            <Box
                component="img"
                src={track.imgUrl ?? 'null'}
                alt={track.title}
                sx={{
                    width: 46,
                    height: 46,
                    borderRadius: '8px',
                    objectFit: 'cover',
                }}
            />
            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    sx={{
                        color: 'var(--orange-peel)',
                        fontSize: 14,
                        fontWeight: 500,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {track.title}
                </Typography>
                <Typography
                    sx={{
                        color: 'white',
                        fontSize: 12,
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {track.authors?.map(a => a.name).join(', ') || 'Unknown Artist'}
                </Typography>
            </Box>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px"
                }}
            >
                <Typography
                    sx={{
                        color: "white",
                    }}
                >
                    {formatTime(track.durationSec)}
                </Typography>
                <IconButton
                    onClick={handleIconClick}
                    sx={{
                        height: "30px",
                        width: "30px"
                    }}
                >
                    <Box height={"20px"} width={"20px"} component={"img"} src={AdditionalIcon}/>
                </IconButton>
            </Box>

            <PlayerTrackContextMenu
                contextMenu={contextMenu}
                onClose={handleCloseContextMenu}
                track={track}
                onCloseFullScreen={onCloseFullScreen}
            />
        </Box>
    );
};

export default PlayerTrackItem;