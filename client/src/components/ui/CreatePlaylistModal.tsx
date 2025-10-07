import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    IconButton,
    Input,
    Modal,
    Radio,
    RadioGroup,
    Typography
} from "@mui/material";
import React, {type FC, useRef, useState} from "react";
import addImage from "../../assets/addImage.svg";
import cancelIcon from "../../assets/CancelButtonIcon.svg";
import {useTranslation} from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import {createPlaylist, fetchPlaylistsOwnByUserId} from "../../store/reducers/action-creators/playlist.ts";
import type {AppDispatch, RootState} from "../../store/store.ts";
import {useKeycloak} from "@react-keycloak/web";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
}

const CreatePlaylistModal: FC<ModalProps>= ({ open, setOpen }) =>{
    const {t} = useTranslation(["sidebar","errors"]);
    const [isPublic, setIsPublic] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [imageFile, setImageFile] = useState<File | null>(null);
    const [playlistName, setPlaylistName] = useState("");
    const [error, setError] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const dispatch = useDispatch<AppDispatch>();
    const { isLoading, error: createError } = useSelector((state: RootState) => state.playlist);
    const { keycloak } = useKeycloak();
    const userId = keycloak.tokenParsed?.sub;

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
                setImageFile(file);
            } else {
                alert('Пожалуйста, выберите файл в формате PNG или JPEG');
            }
        }
    };

    const handleClick = () => {
        fileInputRef.current?.click();
    };

    const handleRemoveImage = (event: React.MouseEvent) => {
        event.stopPropagation();
        if (selectedImage) {
            URL.revokeObjectURL(selectedImage);
            setSelectedImage(null);
            setImageFile(null);
        }
    };

    const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(event.target.value === "true");
    };

    const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPlaylistName(event.target.value);
        if (error) {
            setError("");
        }
    };

    const handleSave = async () => {
        if (!playlistName.trim() || playlistName.trim().toLowerCase() === "liked songs") {
            setError(`${t("errors:error-wrong-playlist-name")}`);
            return;
        }

        if (!userId) {
            setError("Пользователь не авторизован");
            return;
        }

        setError("");

        try {
            const result = await dispatch(createPlaylist({
                name: playlistName.trim(),
                isPublic,
                userId,
                imageFile: imageFile || undefined
            })).unwrap();

            console.log("Плейлист создан:", result);

            if (userId) {
                await dispatch(fetchPlaylistsOwnByUserId({ userId }));
            }

            setOpen(false);
            setPlaylistName("");
            setSelectedImage(null);
            setImageFile(null);
            setIsPublic(false);

            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (e) {
            setError("Ошибка при создании плейлиста");
        }
    };

    const handleClose = () => {
        if (!isLoading) {
            setOpen(false);
            setError("");
        }
    };

    return(
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
                    height:"305px",
                    width: "550px",
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
                    gap: 2,
                    height: "100%"
                }}>
                    <Box sx={{gridColumn: 1}}>
                        <input
                            type="file"
                            accept=".png,.jpeg,.jpg"
                            ref={fileInputRef}
                            onChange={handleFileUpload}
                            style={{display: 'none'}}
                            disabled={isLoading}
                        />

                        {selectedImage ? (
                            <Box
                                onClick={isLoading ? undefined : handleClick}
                                sx={{
                                    height: "260px",
                                    width: "200px",
                                    borderRadius: "10px",
                                    backgroundColor: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: isLoading ? 'default' : 'pointer',
                                    overflow: 'hidden',
                                    position: 'relative',
                                    opacity: isLoading ? 0.6 : 1
                                }}
                            >
                                <IconButton
                                    onClick={handleRemoveImage}
                                    disabled={isLoading}
                                    sx={{
                                        position: 'absolute',
                                        top: '5px',
                                        right: '5px',
                                        color: 'white',
                                        width: '20px',
                                        height: '20px',
                                        '&:hover': {
                                            backgroundColor: 'rgba(0,0,0,0.2)',
                                        }
                                    }}
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
                                    height: "260px",
                                    width: "200px",
                                    borderRadius: "10px",
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
                                />
                            </Box>
                        )}
                    </Box>

                    <Box sx={{gridColumn: 2}}>
                        <Typography
                            sx={{
                                color: "var(--dark-purple)",
                                fontSize: "20px",
                                fontWeight: "700",
                                marginBottom: "10px",
                            }}
                        >
                            {t("title-playlist-name")}
                        </Typography>

                        <Input
                            value={playlistName}
                            onChange={handleNameChange}
                            disableUnderline
                            disabled={isLoading}
                            sx={{
                                height: "46px",
                                width: "100%",
                                border: "1px solid var(--berkeley-blue)",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                marginBottom: "4px"
                            }}
                            inputProps={{
                                style: {
                                    padding: "0 12px",
                                }
                            }}
                        />

                        {(error || createError) && (
                            <Typography
                                sx={{
                                    color: "Red",
                                    fontSize: "12px",
                                    marginBottom: "12px"
                                }}
                            >
                                {error || createError}
                            </Typography>
                        )}

                        <Typography
                            sx={{
                                color: "var(--dark-purple)",
                                fontSize: "15px",
                                marginBottom: "15px"
                            }}
                        >
                            {t("title-proper-rights-image-notification")}
                        </Typography>

                        <Box display={"flex"} flexDirection={"row"} justifyContent={"center"}>
                            <FormControl component="fieldset">
                                <RadioGroup
                                    row
                                    sx={{gap:"30px"}}
                                    value={isPublic}
                                    onChange={handlePrivacyChange}
                                >
                                    <FormControlLabel
                                        value={true}
                                        control={<Radio
                                            sx={{
                                                color: "var(--dark-purple)",
                                                '&.Mui-checked': {
                                                    color: "var(--dark-purple)",
                                                },
                                            }}
                                            disabled={isLoading}
                                        />}
                                        label={t("title-public")}
                                    />
                                    <FormControlLabel
                                        value={false}
                                        control={<Radio
                                            sx={{
                                                color: "var(--dark-purple)",
                                                '&.Mui-checked': {
                                                    color: "var(--dark-purple)",
                                                },
                                            }}
                                            disabled={isLoading}
                                        />}
                                        label={t("title-private")}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Button
                            onClick={handleSave}
                            disabled={isLoading}
                            sx={{
                                marginTop: "30px",
                                backgroundColor: isLoading ? "gray" : "var(--orange-peel)",
                                height: "45px",
                                width: "150px",
                                borderRadius: "10px",
                                marginLeft: "auto",
                                display: "block",
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
                                {isLoading ? "Создание..." : t("title-save")}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreatePlaylistModal;