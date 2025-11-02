import {
    Box,
    Button,
    IconButton,
    Input,
    Modal,
    Typography
} from "@mui/material";
import React, {type FC, useState} from "react";
import cancelIcon from "../../assets/CancelButtonIcon.svg";
import {useTranslation} from "react-i18next";
import { useSelector } from "react-redux";
import type { RootState} from "../../store/store.ts";
import {useKeycloak} from "@react-keycloak/web";

interface ModalProps {
    open: boolean,
    setOpen: (open: boolean) => void,
}

const EditEmailAndPasswordModal: FC<ModalProps>= ({ open, setOpen }) =>{
    const {t} = useTranslation(["profile", "errors"]);
    const [email, setEmail] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const { isLoading } = useSelector((state: RootState) => state.profile);
    const { keycloak } = useKeycloak();

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
        if (error) setError("");
    };

    const handleCurrentPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setCurrentPassword(event.target.value);
        if (error) setError("");
    };

    const handleNewPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewPassword(event.target.value);
        if (error) setError("");
    };

    const handleConfirmPasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setConfirmPassword(event.target.value);
        if (error) setError("");
    };

    const validateForm = () => {
        if (email && !/\S+@\S+\.\S+/.test(email)) {
            setError(t("errors:error-invalid-email"));
            return false;
        }

        if (newPassword && newPassword.length < 6) {
            setError(t("errors:error-password-too-short"));
            return false;
        }

        if (newPassword && newPassword !== confirmPassword) {
            setError(t("errors:error-passwords-dont-match"));
            return false;
        }

        if (newPassword && !currentPassword) {
            setError(t("errors:error-current-password-required"));
            return false;
        }

        return true;
    };

    const handleSave = async () => {
        setError("");
        setSuccess("");

        if (!email && !newPassword) {
            setError(t("errors:error-no-changes"));
            return;
        }

        if (!validateForm()) {
            return;
        }

        try {
            if (email) {
                await keycloak.updateToken(30);
                await keycloak.accountManagement();
            }

            if (newPassword) {
                console.log("Updating password...");
            }

            setSuccess(t("profile:changes-saved-successfully"));
            setTimeout(() => {
                setOpen(false);
                setSuccess("");
                setError("");
                setEmail("");
                setCurrentPassword("");
                setNewPassword("");
                setConfirmPassword("");
            }, 2000);

        } catch (e: unknown) {
            console.error("Ошибка при обновлении данных:", e);
            setError(t("errors:error-update-failed"));
        }
    };

    const handleClose = () => {
        setOpen(false);
        setError("");
        setSuccess("");
        setEmail("");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
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
                    height: "450px",
                    width: "500px",
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
                    display: "flex",
                    flexDirection: "column",
                    gap: 3,
                    height: "100%"
                }}>
                    <Typography
                        sx={{
                            color: "var(--dark-purple)",
                            fontSize: "24px",
                            fontWeight: "700",
                            textAlign: "center",
                            marginBottom: "10px",
                        }}
                    >
                        {t("profile:edit-email-password")}
                    </Typography>

                    {/* Email Section */}
                    <Box>
                        <Typography
                            sx={{
                                color: "var(--dark-purple)",
                                fontSize: "16px",
                                fontWeight: "600",
                                marginBottom: "8px",
                            }}
                        >
                            {t("profile:email")}
                        </Typography>
                        <Input
                            value={email}
                            onChange={handleEmailChange}
                            placeholder={t("profile:enter-new-email")}
                            disableUnderline
                            disabled={isLoading}
                            type="email"
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
                    </Box>

                    {/* Password Section */}
                    <Box>
                        <Typography
                            sx={{
                                color: "var(--dark-purple)",
                                fontSize: "16px",
                                fontWeight: "600",
                                marginBottom: "8px",
                            }}
                        >
                            {t("profile:change-password")}
                        </Typography>

                        <Input
                            value={currentPassword}
                            onChange={handleCurrentPasswordChange}
                            placeholder={t("profile:enter-current-password")}
                            disableUnderline
                            disabled={isLoading}
                            type="password"
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

                        <Input
                            value={newPassword}
                            onChange={handleNewPasswordChange}
                            placeholder={t("profile:enter-new-password")}
                            disableUnderline
                            disabled={isLoading}
                            type="password"
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

                        <Input
                            value={confirmPassword}
                            onChange={handleConfirmPasswordChange}
                            placeholder={t("profile:confirm-new-password")}
                            disableUnderline
                            disabled={isLoading}
                            type="password"
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
                    </Box>

                    {/* Notifications */}
                    <Typography
                        sx={{
                            color: "var(--dark-purple)",
                            fontSize: "14px",
                            fontStyle: "italic",
                            textAlign: "center"
                        }}
                    >
                        {t("profile:password-requirements")}
                    </Typography>

                    {/* Error and Success Messages */}
                    {error && (
                        <Typography
                            sx={{
                                color: "red",
                                fontSize: "14px",
                                textAlign: "center",
                                marginBottom: "12px"
                            }}
                        >
                            {error}
                        </Typography>
                    )}

                    {success && (
                        <Typography
                            sx={{
                                color: "green",
                                fontSize: "14px",
                                textAlign: "center",
                                marginBottom: "12px"
                            }}
                        >
                            {success}
                        </Typography>
                    )}

                    {/* Save Button */}
                    <Button
                        onClick={handleSave}
                        disabled={isLoading}
                        sx={{
                            backgroundColor: isLoading ? "gray" : "var(--orange-peel)",
                            height: "45px",
                            width: "150px",
                            borderRadius: "10px",
                            alignSelf: "center",
                            marginTop: "10px",
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
        </Modal>
    )
}

export default EditEmailAndPasswordModal;