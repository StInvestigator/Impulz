import { Menu, Dialog, DialogTitle, DialogContent, DialogActions, Button, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import React, { useState, useRef } from "react";
import { ContextMenuItem } from "./ContextMenuItem.tsx";
import DeleteIcon from "../../assets/context/DeleteIcon.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../store/store.ts";
import { useKeycloak } from "@react-keycloak/web";
import type { AlbumDto } from "../../models/AlbumDto.ts";
import { deleteAlbum, fetchAlbumsByAuthor, fetchFavoriteAlbums } from "../../store/reducers/action-creators/album.ts";
import { showAlert } from "../../store/reducers/AlertSlice.ts";

interface EditAlbumContextMenuProps {
    contextMenu: { mouseX: number; mouseY: number } | null;
    onClose: () => void;
    album: AlbumDto;
}

export const EditAlbumContextMenu: React.FC<EditAlbumContextMenuProps> = ({
                                                                              contextMenu,
                                                                              onClose,
                                                                              album
                                                                          }) => {
    const { t } = useTranslation(["other", "errors"]);
    const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

    const menuRef = useRef<HTMLDivElement>(null);
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    const handleDeleteClick = () => {
        setConfirmDeleteOpen(true);
        onClose();
    };

    const handleConfirmDelete = async () => {
        setConfirmDeleteOpen(false);
        if (!userId) {
            return;
        }

        try {
            await dispatch(deleteAlbum(album.id)).unwrap();
            await dispatch(fetchAlbumsByAuthor({ authorId: userId, size: 10 })).unwrap();
            await dispatch(fetchFavoriteAlbums({ userId })).unwrap();
            navigate("/");
            dispatch(showAlert({
                message: t("title-album-deleted"),
                severity: 'info'
            }));
        } catch (e: unknown) {
            dispatch(showAlert({
                message: t("errors:error-delete-album"),
                severity: 'error'
            }));
        }
    };

    const handleCancelDelete = () => {
        setConfirmDeleteOpen(false);
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
                    isLast
                    icon={DeleteIcon}
                    text={t("title-delete-album")}
                    onClick={handleDeleteClick}
                />
            </Menu>

            <Dialog
                open={confirmDeleteOpen}
                onClose={handleCancelDelete}
                PaperProps={{
                    sx: {
                        backgroundColor: "var(--columbia-blue)",
                        borderRadius: "16px",
                        padding: "20px",
                        minWidth: "400px"
                    }
                }}
            >
                <DialogTitle sx={{ color: "var(--dark-purple)", fontWeight: 700, fontSize: "20px" }}>
                    {t("title-confirm-delete")}
                </DialogTitle>
                <DialogContent>
                    <Typography sx={{ color: "var(--dark-purple)", fontSize: "16px" }}>
                        {t("text-confirm-delete-album", { name: album.title })}
                    </Typography>
                </DialogContent>
                <DialogActions sx={{ justifyContent: "flex-end", padding: "16px 0 0 0" }}>
                    <Button
                        onClick={handleCancelDelete}
                        sx={{
                            height: "40px",
                            width: "90px",
                            backgroundColor: "var(--columbia-blue)",
                            color: "var(--dark-purple)",
                            border: "1px solid var(--dark-purple)",
                            borderRadius: "10px",
                            textTransform: "none",
                            fontWeight: 600,
                            '&:hover': {
                                backgroundColor: "rgba(64, 64, 128, 0.1)"
                            }
                        }}
                    >
                        {t("title-cancel")}
                    </Button>
                    <Button
                        onClick={handleConfirmDelete}
                        sx={{
                            height: "40px",
                            width: "90px",
                            backgroundColor: "var(--orange-peel)",
                            color: "var(--dark-purple)",
                            borderRadius: "10px",
                            marginLeft: "10px",
                            textTransform: "none",
                            fontWeight: 700,
                            '&:hover': {
                                backgroundColor: "rgba(255, 153, 0, 0.8)"
                            }
                        }}
                    >
                        {t("title-delete")}
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};