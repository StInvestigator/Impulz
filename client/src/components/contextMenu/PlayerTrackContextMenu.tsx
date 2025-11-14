import { Menu} from "@mui/material";
import { useTranslation } from "react-i18next";
import React, {useRef} from "react";
import AddToLikedIcon from "../../assets/context/AddToLikedIcon.png";
import GoToAlbumIcon from "../../assets/context/GoToAlbumIcon.svg";
import GotoAuthorIcon from "../../assets/context/GoToAuthorIcon.svg";
import { ContextMenuItem } from "./ContextMenuItem.tsx";
import { useAppNavigate } from "../../hooks/useAppNavigate.ts";
import type { TrackSimpleDto } from "../../models/DTO/track/TrackSimpleDto.ts";
import {useAppDispatch, useAppSelector} from "../../hooks/redux.ts";
import keycloak from "../../keycloak.ts";
import {likeTrack, unlikeTrack} from "../../store/reducers/action-creators/tracks.ts";
import RemoveFromQueueIcon from "../../assets/context/RemoveFromQueueIcon.svg";
import {removeFromPlaylist} from "../../store/reducers/PlayerSlice.ts";


interface PlayerTrackContextMenuProps {
    contextMenu: { mouseX: number; mouseY: number } | null;
    onClose: () => void;
    track: TrackSimpleDto;
    onCloseFullScreen?: () => void;
}

export const PlayerTrackContextMenu: React.FC<PlayerTrackContextMenuProps> = ({
    contextMenu,
    onClose,
    track,
}) => {
    const { t } = useTranslation(["other","errors"]);
    const route = useAppNavigate();
    const dispatch = useAppDispatch();
    const userId = keycloak.tokenParsed?.sub;
    const { likedIds } = useAppSelector(state => state.liked);

    const menuRef = useRef<HTMLDivElement>(null);

    const handleAddToFavorites = () => {
        if (userId) {
            dispatch(likeTrack({ trackId: track.id, userId: userId }));
        }
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

    const handleRemoveFromQueue = () => {
        dispatch(removeFromPlaylist(track));
        onClose();
    }

     const handleRemoveFromFavorites = () => {
            if (userId) {
                dispatch(unlikeTrack({ trackId: track.id, userId: userId }));
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
            >
                {(likedIds && likedIds.includes(track.id) ?
                        <ContextMenuItem
                            icon={AddToLikedIcon}
                            text={t("title-remove-from-liked")}
                            onClick={handleRemoveFromFavorites}
                        />
                        :
                        <ContextMenuItem
                            icon={AddToLikedIcon}
                            text={t("title-add-to-liked")}
                            onClick={handleAddToFavorites}
                        />
                )}

                <ContextMenuItem
                    icon={RemoveFromQueueIcon}
                    text={t("title-remove-from-queue")}
                    onClick={handleRemoveFromQueue}
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
                    isLast={true}
                />

            </Menu>

        </>
    );
};