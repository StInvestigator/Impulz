import { useState, type FC } from "react";
import { ListItem, ListItemButton, Box, Typography, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useAppNavigate } from "../../../hooks/useAppNavigate.ts";
import { useContextMenu } from "../../../hooks/useContextMenu.ts";
import { EditPlaylistContextMenu } from "../../contextMenu/EditPlaylistContextMenu.tsx";
import type { PlaylistDto } from "../../../models/PlaylistDto.ts";

interface PlaylistProps {
    playlist: PlaylistDto;
    defaultImage: string;
}

const MyPlaylistItem: FC<PlaylistProps> = ({ playlist, defaultImage }) => {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const route = useAppNavigate();
    const { t } = useTranslation('other');
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useContextMenu();

    const handleClick = () => {
        setActive(!active);
        route(`/playlist/${playlist.id}`);
    };

    const handleContextMenuClick = (event: React.MouseEvent) => {
        event.preventDefault();
        handleContextMenu(event, playlist.id);
    };

    return (
        <ListItem disablePadding>
            <ListItemButton
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onContextMenu={handleContextMenuClick}
                onClick={handleClick}
                sx={{
                    gap: 1,
                    borderRadius: '15px',
                    transition: 'color 0.3s, background-color 0.3s',
                    padding: "12px 12px",
                    color: active ? '#DAE4FB' : (hover ? 'var(--deep-sky-blue)' : '#DAE4FB'),
                    '&:hover': {
                        color: 'var(--deep-sky-blue)',
                        backgroundColor: 'rgba(0, 0, 0, 0.04)',
                        '& .MuiTypography-root': {
                            color: 'var(--deep-sky-blue)',
                        },
                        '& .MuiListItemText-root': {
                            color: 'var(--deep-sky-blue)',
                        },
                    },
                }}
                disableRipple
            >
                <ListItemIcon>
                    <Box
                        component="img"
                        src={playlist.imgUrl || defaultImage}
                        alt={playlist.title}
                        sx={{
                            width: 40,
                            height: 40,
                            borderRadius: '8px',
                            objectFit: 'cover',
                            transition: 'transform 0.2s ease',
                            transform: hover ? 'scale(1.1)' : 'scale(1)',
                        }}
                    />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    sx={{
                        fontWeight: 400,
                        fontSize: "16px",
                        color: 'inherit',
                    }}
                    primary={playlist.title}
                    secondary={
                        <Box
                            component="span"
                            sx={{
                                display: 'flex',
                                color: 'inherit',
                                alignItems: 'center',
                                mt: 0.5,
                            }}
                        >
                            <Typography
                                component="span"
                                variant={"mainRM"}
                                sx={{
                                    color: 'inherit',
                                }}
                            >
                                {t("title-playlist")} &middot; {playlist?.tracks.length || 0} {t("title-song")}
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
                <EditPlaylistContextMenu
                    playlist={playlist}
                    contextMenu={contextMenu}
                    onClose={handleCloseContextMenu}
                />
        </ListItem>
    );
};

export default MyPlaylistItem;