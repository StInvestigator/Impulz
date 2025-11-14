import { Menu } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState, useRef, useEffect } from "react";
import AddToLikedIcon from "../../assets/context/AddToLikedIcon.png";
import GotoAuthorIcon from "../../assets/context/GoToAuthorIcon.svg";
import CopyTrackLinkIcon from "../../assets/context/CopyTrackLinkIcon.svg";
import { ContextMenuItem } from "./ContextMenuItem.tsx";
import { useAppNavigate } from "../../hooks/useAppNavigate.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import keycloak from "../../keycloak.ts";
import CreatePlaylistModal from "../ui/CreatePlaylistModal.tsx";
import type {AuthorSimpleDto} from "../../models/DTO/AuthorSimpleDto.ts";
import {subscribeToAuthor, unsubscribeFromAuthor, fetchAuthorsByFollower, checkSubscriptionStatus} from "../../store/reducers/action-creators/author.ts";
import {showAlert} from "../../store/reducers/AlertSlice.ts";

interface AuthorContextMenuProps {
    contextMenu: { mouseX: number; mouseY: number } | null;
    onClose: () => void;
    author: AuthorSimpleDto;
}

export const AuthorContextMenu: React.FC<AuthorContextMenuProps> = ({
                                                                        contextMenu,
                                                                        onClose,
                                                                        author
                                                                    }) => {
    const { t } = useTranslation(["other", "errors"]);
    const [isCreatePlaylistModalOpen, setIsCreatePlaylistModalOpen] = useState(false);
    const route = useAppNavigate();
    const dispatch = useAppDispatch();
    const userId = keycloak.tokenParsed?.sub;
    const { subscriptionStatus } = useAppSelector(state => state.author);

    const isSubscribed = author?.id ? subscriptionStatus[author.id] : false;

    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (author?.id && userId && contextMenu !== null) {
            dispatch(checkSubscriptionStatus(author.id));
        }
    }, [author?.id, userId, contextMenu, dispatch]);

    const handleAddToFavorites = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (userId && author?.id) {
            const action = isSubscribed ? unsubscribeFromAuthor : subscribeToAuthor;

            dispatch(action(author.id))
                .unwrap()
                .then(() => {
                    if (userId) {
                        dispatch(fetchAuthorsByFollower({ followerId: userId }));
                    }
                    dispatch(checkSubscriptionStatus(author.id));
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
                <ContextMenuItem
                    isFirst={true}
                    icon={AddToLikedIcon}
                    text={isSubscribed ? t("title-unsubscribe") : t("title-subscribe")}
                    onClick={handleAddToFavorites}
                />

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