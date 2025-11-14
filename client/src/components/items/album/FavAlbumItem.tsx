import { useState, type FC } from "react";
import { ListItem, ListItemButton, Box, Typography, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from 'react-i18next';
import { useAppNavigate } from "../../../hooks/useAppNavigate.ts";
import type { AlbumSimpleDto } from "../../../models/DTO/album/AlbumSimpleDto.ts";
import heartImage from "../../../assets/sidebar/heart.svg";
import { useContextMenu } from "../../../hooks/useContextMenu.ts";
import { FavAlbumContextMenu } from "../../contextMenu/FavAlbumContextMenu.tsx";

interface AlbumProps {
    album: AlbumSimpleDto;
}

const FavAlbumItem: FC<AlbumProps> = ({ album }) => {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);
    const route = useAppNavigate();
    const { t } = useTranslation('other');
    const { contextMenu, handleContextMenu, handleCloseContextMenu } = useContextMenu();

    const handleClick = () => {
        setActive(!active);
        route(`/album/${album.id}`);
    };


    return (
        <ListItem disablePadding>
            <ListItemButton
                onContextMenu={(e) => handleContextMenu(e, album.id)}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
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
                <ListItemIcon
                    sx={{
                        position: "relative",
                        minWidth: 40,
                        width: 40,
                        height: 40,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: 0,
                        paddingRight: 2
                    }}
                >
                    <Box
                        component="img"
                        src={album.imgUrl}
                        alt={album.title}
                        sx={{
                            width: "100%",
                            height: "100%",
                            borderRadius: "8px",
                            objectFit: "cover",
                            transition: "transform 0.2s ease",
                            transform: hover ? "scale(1.1)" : "scale(1)",
                            display: "block",
                        }}
                    />

                    <Box
                        component="img"
                        src={heartImage}
                        alt="favorite"
                        sx={{
                            position: "absolute",
                            bottom: -6,
                            right: 6,
                            width: 18,
                            height: 18,
                            opacity: 0.95,
                            pointerEvents: "none",
                            zIndex: 2,
                            filter: "drop-shadow(0 0 2px black)",
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
                    primary={album.title}
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
                                {t("title-album")} &middot; {album.tracks?.length || 0} {t("title-song")}
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
            <FavAlbumContextMenu
                contextMenu={contextMenu}
                onClose={handleCloseContextMenu}
                album={album}
            />
        </ListItem>

    );
};

export default FavAlbumItem;