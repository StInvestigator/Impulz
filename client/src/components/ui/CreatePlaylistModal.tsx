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

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
}

const CreatePlaylistModal: FC<ModalProps>= ({ open, setOpen }) =>{

    const {t} = useTranslation("sidebar");
    const [isPublic, setIsPublic] = useState(false);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;
        if (files && files.length > 0) {
            const file = files[0];
            if (file.type === 'image/png' || file.type === 'image/jpeg') {
                const imageUrl = URL.createObjectURL(file);
                setSelectedImage(imageUrl);
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
        }
    };

    const handlePrivacyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsPublic(event.target.value === "true");
    };

    return(
        <Modal
            open={open}
            onClose={() => setOpen(false)}
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
                    onClick={() => setOpen(false)}
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
                        />

                        {selectedImage ? (
                            <Box
                                onClick={handleClick}
                                sx={{
                                    height: "260px",
                                    width: "200px",
                                    borderRadius: "10px",
                                    backgroundColor: "white",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
                                    overflow: 'hidden',
                                    position: 'relative',
                                }}
                            >
                                <IconButton
                                    onClick={handleRemoveImage}
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
                                onClick={handleClick}
                                sx={{
                                    height: "260px",
                                    width: "200px",
                                    borderRadius: "10px",
                                    backgroundColor: "white",
                                    border: "1px solid var(--berkeley-blue)",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    cursor: "pointer",
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
                            disableUnderline
                            sx={{
                                height: "46px",
                                width: "100%",
                                border: "1px solid var(--berkeley-blue)",
                                borderRadius: "10px",
                                backgroundColor: "white",
                                marginBottom: "12px"
                            }}
                            inputProps={{
                                style: {
                                    padding: "0 12px",
                                }
                            }}
                        />

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
                                        />}
                                        label={t("title-private")}
                                    />
                                </RadioGroup>
                            </FormControl>
                        </Box>
                        <Button
                            sx={{
                                marginTop: "30px",
                                backgroundColor: "var(--orange-peel)",
                                height: "45px",
                                width: "150px",
                                borderRadius: "10px",
                                marginLeft: "auto",
                                display: "block",
                            }}
                        >
                            <Typography
                                sx={{
                                    color:"var(--dark-purple)",
                                    fontSize: "20px",
                                    fontWeight: "700",
                                    fontFamily: "Manrope",
                                    textTransform: "none"
                                }}
                            >
                                {t("title-save")}
                            </Typography>
                        </Button>
                    </Box>
                </Box>
            </Box>
        </Modal>
    )
}

export default CreatePlaylistModal;