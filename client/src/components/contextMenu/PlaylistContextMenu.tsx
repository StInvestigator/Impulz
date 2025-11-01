import { Menu, Snackbar, Alert } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState, useRef } from "react";
import AddToLikedIcon from "../../assets/context/AddToLikedIcon.png";
import AddToQueueIcon from "../../assets/context/AddToQueueIcon.svg";
import CopyTrackLinkIcon from "../../assets/context/CopyTrackLinkIcon.svg";
import { ContextMenuItem } from "./ContextMenuItem.tsx";
import { useAppDispatch } from "../../hooks/redux.ts";
import keycloak from "../../keycloak.ts";
import CreatePlaylistModal from "../ui/CreatePlaylistModal.tsx";
import { usePlayTrack } from "../../hooks/usePlayTrack.tsx";
import type { PlaylistDto } from "../../models/PlaylistDto.ts";
import { fetchFavoritePlaylists, likePlaylist } from "../../store/reducers/action-creators/playlist.ts";

interface PlaylistContextMenuProps {
    contextMenu: { mouseX: number; mouseY: number } | null;
    onClose: () => void;
    playlist: PlaylistDto;
}

export const PlaylistContextMenu: React.FC<PlaylistContextMenuProps> = ({
    contextMenu,
    onClose,
    playlist
}) => {
    const { t } = useTranslation(["other", "errors"]);
    const [toastOpen, setToastOpen] = useState(false);
    const [errorToastOpen, setErrorToastOpen] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const userId = keycloak.tokenParsed?.sub;
    const { addToQueue } = usePlayTrack();

    const menuRef = useRef<HTMLDivElement>(null);

    const handleAddToFavorites = (e: React.MouseEvent) => {
        e.stopPropagation();
        console.log("Like playlist");
        if (userId) {
            dispatch(likePlaylist({ playlistId: playlist.id, userId: userId })).then(() => {
                dispatch(fetchFavoritePlaylists({ userId: userId }))
            })
        }
        onClose();
    };

    const handleCopyTrackLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        const albumLink = `${window.location.origin}/playlist/${playlist.id}`;

        navigator.clipboard.writeText(albumLink)
            .then(() => {
                console.log("Playlist link copied to clipboard:", albumLink);
                setToastOpen(true);
            })
            .catch(err => {
                console.error("Failed to copy playlist link:", err);
            });

        onClose();
    };

    const handleAddToQueue = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToQueue(playlist, "playlist");
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
            >
                <ContextMenuItem
                    isFirst={true}
                    icon={AddToLikedIcon}
                    text={t("title-add-to-liked")}
                    onClick={handleAddToFavorites}
                />

                <ContextMenuItem
                    icon={AddToQueueIcon}
                    text={t("title-add-to-queue")}
                    onClick={(e) => handleAddToQueue(e)}
                />

                <ContextMenuItem
                    icon={CopyTrackLinkIcon}
                    text={t("title-copy-playlist-link")}
                    onClick={handleCopyTrackLink}
                    isLast={true}
                />
            </Menu>

            <CreatePlaylistModal
                open={isCreatePlaylistModalOpen}
                setOpen={setIsCreatePlaylistModalOpen}
            />

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

            <Snackbar
                open={errorToastOpen}
                autoHideDuration={3000}
                onClose={handleCloseErrorToast}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
                <Alert
                    onClose={handleCloseErrorToast}
                    severity="warning"
                    variant="filled"
                    sx={{
                        backgroundColor: '#ff9800',
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