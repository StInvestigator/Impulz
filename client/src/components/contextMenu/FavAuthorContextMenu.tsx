import { Menu } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState, useRef } from "react";
import AddToLikedIcon from "../../assets/context/AddToLikedIcon.png";
import GotoAuthorIcon from "../../assets/context/GoToAuthorIcon.svg";
import CopyTrackLinkIcon from "../../assets/context/CopyTrackLinkIcon.svg";
import { ContextMenuItem } from "./ContextMenuItem.tsx";
import { useAppNavigate } from "../../hooks/useAppNavigate.ts";
import { useAppDispatch } from "../../hooks/redux.ts";
import keycloak from "../../keycloak.ts";
import CreatePlaylistModal from "../ui/CreatePlaylistModal.tsx";
import type { AuthorSimpleDto } from "../../models/DTO/AuthorSimpleDto.ts";
import { unsubscribeFromAuthor, fetchAuthorsByFollower } from "../../store/reducers/action-creators/author.ts";
import { showAlert } from "../../store/reducers/AlertSlice.ts";

interface FavAuthorContextMenuProps {
    contextMenu: { mouseX: number; mouseY: number } | null;
    onClose: () => void;
    author: AuthorSimpleDto;
}

export const FavAuthorContextMenu: React.FC<FavAuthorContextMenuProps> = ({
    contextMenu,
    onClose,
    author
}) => {
    const { t } = useTranslation(["other", "errors"]);
    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
    const route = useAppNavigate();
    const dispatch = useAppDispatch();
    const userId = keycloak.tokenParsed?.sub;

    const menuRef = useRef<HTMLDivElement>(null);

    const handleAddToFavorites = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (userId && author?.id) {
            dispatch(unsubscribeFromAuthor(author.id))
                .unwrap()
                .then(() => {
                    if (userId) {
                        dispatch(fetchAuthorsByFollower({ followerId: userId }));
                    }
                })
                .catch((error) => {
                    dispatch(showAlert({
                        message: t("error-subscription") || error,
                        severity: 'error'
                    }));
                });
        }
        onClose();
    };

    const handleAuthorLink = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (author?.id) {
            const authorLink = `${window.location.origin}/author/${author.id}`;

            navigator.clipboard.writeText(authorLink)
                .then(() => {
                    dispatch(showAlert({
                        message: t("title-link-copied"),
                        severity: 'info'
                    }));
                })
                .catch(e => {
                    dispatch(showAlert({
                        message: `${t("error-copy-link")}: ${e}`,
                        severity: 'error'
                    }));
                });
        }
        onClose();
    };

    const handleGoToAuthor = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (author?.id) {
            route(`/author/${author.id}`);
        }
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
                onClick={(e) => e.stopPropagation()}
            >
                {author?.id != userId &&
                    <ContextMenuItem
                        isFirst={true}
                        icon={AddToLikedIcon}
                        text={ t("title-unsubscribe")}
                        onClick={handleAddToFavorites}
                    />}

                <ContextMenuItem
                    icon={GotoAuthorIcon}
                    text={t("title-go-to-author")}
                    onClick={handleGoToAuthor}
                />

                <ContextMenuItem
                    icon={CopyTrackLinkIcon}
                    text={t("title-copy-author-link")}
                    onClick={handleAuthorLink}
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