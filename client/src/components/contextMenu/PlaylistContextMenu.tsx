import { Menu } from "@mui/material";
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
import { showAlert } from "../../store/reducers/AlertSlice.ts";

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
    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const userId = keycloak.tokenParsed?.sub;
    const { addToQueue } = usePlayTrack();

    const menuRef = useRef<HTMLDivElement>(null);

    const handleAddToFavorites = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (userId) {
            dispatch(likePlaylist({ playlistId: playlist.id, userId: userId }))
                .unwrap()
                .then(() => {
                    dispatch(fetchFavoritePlaylists({ userId: userId }));
                })
                .catch((error) => {
                    dispatch(showAlert({
                        message: error || t("errors:error-add-to-liked"),
                        severity: 'error'
                    }));
                });
        }
        onClose();
    };

    const handleCopyPlaylistLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        const playlistLink = `${window.location.origin}/playlist/${playlist.id}`;

        navigator.clipboard.writeText(playlistLink)
            .then(() => {
                dispatch(showAlert({
                    message: t("title-link-copied"),
                    severity: 'info'
                }));
            })
            .catch(error => {
                dispatch(showAlert({
                    message: t("errors:error-copy-link") || error,
                    severity: 'error'
                }));
            });

        onClose();
    };

    const handleAddToQueue = (e: React.MouseEvent) => {
        e.stopPropagation();
        addToQueue(playlist, "playlist");
        onClose();
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
                    onClick={handleAddToQueue}
                />

                <ContextMenuItem
                    icon={CopyTrackLinkIcon}
                    text={t("title-copy-playlist-link")}
                    onClick={handleCopyPlaylistLink}
                    isLast={true}
                />
            </Menu>

            <CreatePlaylistModal
                open={isCreatePlaylistModalOpen}
                setOpen={setIsCreatePlaylistModalOpen}
            />
        </>
    );
};