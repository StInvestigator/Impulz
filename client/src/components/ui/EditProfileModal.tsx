import {
    Box,
    Button,
    IconButton,
    Input,
    Modal,
    Typography
} from "@mui/material";
import React, { type FC, useRef, useState, useEffect } from "react";
import addImage from "../../assets/addImage.svg";
import cancelIcon from "../../assets/CancelButtonIcon.svg";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../store/store.ts";
import { useKeycloak } from "@react-keycloak/web";
import { updateUserProfile } from "../../store/reducers/action-creators/user";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
}

const EditProfileModal: FC<ModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation(["profile", "errors"]);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [username, setUsername] = useState("");
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error: updateError } = useSelector((state: RootState) => state.profile);
    const { profile } = useSelector((state: RootState) => state.profile);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    useEffect(() => {
        if (open && profile) {
            setUsername(profile.authorDto ? profile.authorDto.name : profile.username);
            if (profile.avatarUrl) {
                setSelectedImage(profile.avatarUrl);
                setImageFile(null)
            }
        }
    }, [open, profile]);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                if (file.size > 5 * 1024 * 1024) {
                    alert(t("errors:error-file-too-large"));
                    return;
                }

                const img = new Image();
                img.onload = () => {
                    if (img.width < 400 || img.height < 400) {
                        alert(t("errors:error-image-too-small"));
                    } else {
                        const imageUrl = URL.createObjectURL(file);
                        setSelectedImage(imageUrl);
                        setImageFile(file);
                    }
                };
                img.src = URL.createObjectURL(file);
            } else {
                alert(t("errors:error-invalid-format"));
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (selectedImage) {
            if (selectedImage.startsWith('blob:')) {
                URL.revokeObjectURL(selectedImage);
            }
            setSelectedImage(profile.avatarUrl || null);
            setImageFile(null);
        }
    };

    const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
        if (error) {
            setError("");
        }
    };

    const handleSave = async () => {
        if (!username.trim()) {
            setError(t("errors:error-empty-username"));
            return;
        }

        if (!userId) {
            setError(t("errors:error-unauthorized"));
            return;
        }

        setError("");

        try {
            await dispatch(updateUserProfile({
                userId,
                username: username.trim(),
                imageFile: imageFile || undefined
            })).unwrap();

            setOpen(false);
            setError("");

        } catch (e: unknown) {
            console.error("Ошибка при обновлении профиля:", e);
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setOpen(false);
            setError("");
            if (selectedImage && selectedImage.startsWith('blob:')) {
                URL.revokeObjectURL(selectedImage);
            }
        }
    };

    return (
        <Modal
            open={open}
            onClose={handleClose}
            sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Box
                sx={{
                    height: "350px",
                    width: "600px",
                    backgroundColor: "var(--columbia-blue)",
                    outline: 'none',
                    borderRadius: "16px",
                    padding: "30px",
                    display: "flex",
                    flexDirection: "column"
                }}
            >
                <IconButton
                    onClick={handleClose}
                    disabled={isLoading}
                    sx={{
                        height: "20px",
                        width: "20px",
                        alignSelf: "self-end",
                        marginBottom: "15px"
                    }}
                >
                    <Box component="img" src={cancelIcon} />
                </IconButton>

                <Box sx={{
                    display: "grid",
                    gridTemplateColumns: "auto 1fr",
                    gap: 3,
                    height: "100%"
                }}>
                    {/* Левая часть - аватар */}
                    <Box sx={{ gridColumn: 1 }}>
                        <input
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            style={{ display: 'none' }}
                            disabled={isLoading}
                        />

                        {selectedImage ? (
                            <Box
                                onClick={isLoading ? undefined : handleClick}
                                sx={{
                                    height: "200px",
                                    width: "200px",
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: isLoading ? 'default' : 'pointer',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    opacity: isLoading ? 0.6 : 1,
                                    border: "2px solid var(--berkeley-blue)"
                                }}
                            >
                                <IconButton
                                    onClick={handleRemoveImage}
                                    disabled={isLoading}
                                    sx={{
                                        position: 'absolute',
                                        top: '30px',
                                        right: '30px',
                                        color: 'white',
                                        backgroundColor: 'rgba(0,0,0,0.5)',
                                        width: '24px',
                                        height: '24px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.7)',
                                        }
                                    }}
                                    title={t("profile:remove-image")}
                                >
                                    ✕
                                </IconButton>

                                <Box
                                    component="img"
                                    src={selectedImage}
                                    sx={{
                                        width: '100%',
                                        height: '100%',
                                        objectFit: 'cover'
                                    }}
                                    alt="Uploaded preview"
                                />
                            </Box>
                        ) : (
                            <Box
                                onClick={isLoading ? undefined : handleClick}
                                sx={{
                                    height: "200px",
                                    width: "200px",
                                    borderRadius: "50%",
                                    backgroundColor: "white",
                                    border: "1px solid var(--berkeley-blue)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: isLoading ? 'default' : 'pointer',
                                    opacity: isLoading ? 0.6 : 1
                                }}
                            >
                                <Box
                                    component="img"
                                    src={addImage}
                                    sx={{
                                        height: "90px",
                                        width: "90px",
                                    }}
                                    alt="Add image"
                                />
                            </Box>
                        )}
                    </Box>

                    {/* Правая часть - форма */}
                    <Box sx={{ gridColumn: 2, display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
                        <Box>
                            <Typography
                                sx={{
                                    color: "var(--dark-purple)",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    marginBottom: "10px",
                                }}
                            >
                                {t("profile:edit-nickname")}
                            </Typography>

                            <Input
                                value={username}
                                onChange={handleUsernameChange}
                                placeholder={t("profile:enter-nickname")}
                                disableUnderline
                                disabled={isLoading}
                                sx={{
                                    height: "46px",
                                    width: "100%",
                                    border: "1px solid var(--berkeley-blue)",
                                    borderRadius: "10px",
                                    backgroundColor: "white",
                                    marginBottom: "8px"
                                }}
                                inputProps={{
                                    style: {
                                        padding: "0 12px",
                                    }
                                }}
                            />

                            {(error || updateError) && (
                                <Typography
                                    sx={{
                                        color: "red",
                                        fontSize: "12px",
                                        marginBottom: "12px"
                                    }}
                                >
                                    {error || (updateError?.includes("400") ? "This username is already taken" : updateError)}
                                </Typography>
                            )}

                            <Typography
                                sx={{
                                    color: "var(--dark-purple)",
                                    fontSize: "14px",
                                    marginBottom: "8px",
                                    fontWeight: "500"
                                }}
                            >
                                {t("profile:file-format")}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "var(--dark-purple)",
                                    fontSize: "14px",
                                    marginBottom: "8px",
                                    fontWeight: "500"
                                }}
                            >
                                {t("profile:file-size")}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "var(--dark-purple)",
                                    fontSize: "14px",
                                    marginBottom: "8px",
                                    fontWeight: "500"
                                }}
                            >
                                {t("profile:file-weight")}
                            </Typography>

                            <Typography
                                sx={{
                                    color: "var(--dark-purple)",
                                    fontSize: "14px",
                                    fontStyle: "italic",
                                    marginTop: "10px"
                                }}
                            >
                                {t("profile:rights-notice")}
                            </Typography>
                        </Box>

                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            sx={{
                                backgroundColor: isLoading ? "gray" : "var(--orange-peel)",
                                height: "45px",
                                width: "150px",
                                borderRadius: "10px",
                                alignSelf: "flex-end",
                                '&:disabled': {
                                    backgroundColor: 'gray',
                                    color: 'white'
                                }
                            }}
                        >
                            <Typography
                                sx={{
                                    color: isLoading ? "white" : "var(--dark-purple)",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    fontFamily: "Manrope",
                                    textTransform: "none"
                                }}
                            >
                                {isLoading ? t("profile:saving") : t("profile:save")}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default EditProfileModal;