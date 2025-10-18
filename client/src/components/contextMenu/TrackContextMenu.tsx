import { Menu, Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, {useState, useRef} from "react";
import AddToPlaylistIcon from "../../assets/context/AddToPlaylistIcon.svg";
import AddToLikedIcon from "../../assets/context/AddToLikedIcon.svg";
import AddToQueueIcon from "../../assets/context/AddToQueueIcon.svg";
import GoToAlbumIcon from "../../assets/context/GoToAlbumIcon.svg";
import GotoAuthorIcon from "../../assets/context/GotoAuthorIcon.svg";
import CopyTrackLinkIcon from "../../assets/context/CopyTrackLinkIcon.svg";
import ContextCreatePlaylistIcon from "../../assets/context/ContextCreatePlaylistIcon.svg";
import { ContextMenuItem } from "./ContextMenuItem.tsx";
import { useAppNavigate } from "../../hooks/useAppNavigate.ts";
import type { TrackSimpleDto } from "../../models/DTO/track/TrackSimpleDto.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import {addTrackToPlaylist, fetchPlaylistsOwnByUserId} from "../../store/reducers/action-creators/playlist.ts";
import {ContextMenuItemWithSubmenu} from "./ContextMenuItemWithSubmenu.tsx";
import keycloak from "../../keycloak.ts";

interface TrackContextMenuProps {
    contextMenu: { mouseX: number; mouseY: number } | null;
    onClose: () => void;
    track: TrackSimpleDto;
    onAddToPlaylist: (trackId: number) => void;
}

export const TrackContextMenu: React.FC<TrackContextMenuProps> = ({
                                                                      contextMenu,
                                                                      onClose,
                                                                      track
                                                                  }) => {
    const { t } = useTranslation("other");
    const [toastOpen, setToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [playlistMenuAnchor, setPlaylistMenuAnchor] = useState<null | HTMLElement>(null);
    const route = useAppNavigate();
    const dispatch = useAppDispatch();
    const { playlistsOwnByCurrentUser } = useAppSelector(state => state.playlist);
    const userId = keycloak.tokenParsed?.sub;

    const menuRef = useRef<HTMLDivElement>(null);
    const subMenuRef = useRef<HTMLDivElement>(null);

    const handlePlaylistMenuClose = () => {
        setPlaylistMenuAnchor(null);
    };

    const handleMainMenuMouseLeave = (event: React.MouseEvent) => {
        const relatedTarget = event.relatedTarget as Node;
        const isLeavingToSubMenu = subMenuRef.current?.contains(relatedTarget);

        if (!isLeavingToSubMenu) {
            setPlaylistMenuAnchor(null);
            onClose();
        }
    };

    const handleSubMenuMouseLeave = (event: React.MouseEvent) => {
        const relatedTarget = event.relatedTarget as Node;
        const isLeavingToMainMenu = menuRef.current?.contains(relatedTarget);

        if (!isLeavingToMainMenu) {
            setPlaylistMenuAnchor(null);
            onClose();
        }
    };

    const handleAddToSpecificPlaylist = (playlistId: number) => {
        return () => {
            console.log("Add track to playlist:", track.id, playlistId);
            dispatch(addTrackToPlaylist({ trackId: track.id, playlistId: playlistId }))
                .unwrap()
                .then(() => {
                    console.log("Track added successfully");
                    if(userId){
                        dispatch(fetchPlaylistsOwnByUserId({ userId }));
                    }
                    onClose();
                })
                .catch((error) => {
                    console.error("Failed to add track:", error);

                    if (error.includes("Track already exists in playlist")) {
                        setErrorMessage("Цей трек вже є в плейлісті");
                        setErrorToastOpen(true);
                    }

                    onClose();
                });
        };
    };

    const handleCreatePlaylist = () => {
        console.log("Create new playlist for track:", track.id);
        handlePlaylistMenuClose();
        onClose();
    };

    const handleAddToFavorites = () => {
        console.log("Add to favorites:", track.id);
        onClose();
    };

    const handleGoToAuthor = () => {
        route(`/author/${track.authors[0].id}`);
        onClose();
    };

    const handleGoToAlbum = () => {
        route(`/album/${track.albumId}`);
        onClose();
    };

    const handleCopyTrackLink = () => {
        const trackLink = `${window.location.origin}/track/${track.id}`;

        navigator.clipboard.writeText(trackLink)
            .then(() => {
                console.log("Track link copied to clipboard:", trackLink);
                setToastOpen(true);
            })
            .catch(err => {
                console.error("Failed to copy track link:", err);
            });

        onClose();
    };

    const handleCloseToast = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setToastOpen(false);
    };

    const handleCloseErrorToast = (_event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorToastOpen(false);
        setErrorMessage("");
    };

    return (
        <>
            <Menu
                open={contextMenu !== null}
                onClose={onClose}
                anchorReference="anchorPosition"
                anchorPosition={
                    contextMenu !== null
                        ? { top: contextMenu.mouseY, left: contextMenu.mouseX }
                        : undefined
                }
                PaperProps={{
                    sx: {
                        border: "1px solid var(--dodger-blue)",
                        backgroundColor: "white",
                        borderRadius: "8px",
                        minWidth: "200px",
                        overflow: "visible",
                    },
                    ref: menuRef
                }}
                onMouseLeave={handleMainMenuMouseLeave}
            >
                <ContextMenuItemWithSubmenu
                    icon={AddToPlaylistIcon}
                    text={t("title-add-to-playlist")}
                    isFirst={true}
                    submenuItems={[
                        {
                            icon: ContextCreatePlaylistIcon,
                            text: t("title-create-playlist") || "Створити плейліст",
                            onClick: handleCreatePlaylist,
                            isFirst: true,
                        },
                        ...playlistsOwnByCurrentUser.map((playlist, index) => ({
                            icon: AddToPlaylistIcon,
                            text: playlist.title,
                            onClick: handleAddToSpecificPlaylist(playlist.id),
                            isLast: index === playlistsOwnByCurrentUser.length - 1,
                        }))
                    ]}
                />

                <Menu
                    open={Boolean(playlistMenuAnchor)}
                    anchorEl={playlistMenuAnchor}
                    onClose={handlePlaylistMenuClose}
                    anchorOrigin={{
                        vertical: 'top',
                        horizontal: 'right',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                    }}
                    sx={{
                        '& .MuiPaper-root': {
                            marginLeft: '8px !important',
                        }
                    }}
                    PaperProps={{
                        sx: {
                            border: "1px solid var(--dodger-blue)",
                            backgroundColor: "white",
                            borderRadius: "8px",
                            minWidth: "180px",
                            maxHeight: "150px",
                            overflow: "auto",
                            boxShadow: '2px 2px 8px rgba(0,0,0,0.1)',
                            '&::-webkit-scrollbar': {
                                width: '6px',
                            },
                            '&::-webkit-scrollbar-track': {
                                background: 'transparent',
                            },
                            '&::-webkit-scrollbar-thumb': {
                                background: 'var(--dodger-blue)',
                                borderRadius: '3px',
                            },
                        },
                        ref: subMenuRef
                    }}
                    onMouseLeave={handleSubMenuMouseLeave}
                >
                    <ContextMenuItem
                        icon={ContextCreatePlaylistIcon}
                        text={t("title-create-playlist") || "Створити плейліст"}
                        onClick={handleCreatePlaylist}
                        isFirst={true}
                    />

                    {playlistsOwnByCurrentUser.map((playlist, index) => (
                        <ContextMenuItem
                            key={playlist.id}
                            icon={AddToPlaylistIcon}
                            text={playlist.title}
                            onClick={() => handleAddToSpecificPlaylist(playlist.id)}
                            isLast={index === playlistsOwnByCurrentUser.length - 1}
                        />
                    ))}
                </Menu>

                <ContextMenuItem
                    icon={AddToLikedIcon}
                    text={t("title-add-to-liked")}
                    onClick={handleAddToFavorites}
                />

                <ContextMenuItem
                    icon={AddToQueueIcon}
                    text={t("title-add-to-queue")}
                    onClick={handleAddToFavorites}
                />

                <ContextMenuItem
                    icon={GotoAuthorIcon}
                    text={t("title-go-to-author")}
                    onClick={handleGoToAuthor}
                />

                <ContextMenuItem
                    icon={GoToAlbumIcon}
                    text={t("title-go-to-album")}
                    onClick={handleGoToAlbum}
                />

                <ContextMenuItem
                    icon={CopyTrackLinkIcon}
                    text={t("title-copy-track-link")}
                    onClick={handleCopyTrackLink}
                    isLast={true}
                />
            </Menu>

            {/* Snackbar для успешного копирования ссылки */}
            <Snackbar
                open={toastOpen}
                autoHideDuration={2000}
                onClose={handleCloseToast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseToast}
                    severity="info"
                    sx={{
                        backgroundColor: 'var(--dodger-blue)',
                        color: 'white',
                        '& .MuiAlert-icon': {
                            color: 'white',
                        }
                    }}
                >
                    {t("title-link-copied")}
                </Alert>
            </Snackbar>

            {/* Snackbar для ошибки дублирования трека */}
            <Snackbar
                open={errorToastOpen}
                autoHideDuration={3000}
                onClose={handleCloseErrorToast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseErrorToast}
                    severity="warning"
                    sx={{
                        backgroundColor: 'var(--warning-color)', // или любой другой цвет для предупреждения
                        color: 'white',
                        '& .MuiAlert-icon': {
                            color: 'white',
                        }
                    }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </>
    );
};