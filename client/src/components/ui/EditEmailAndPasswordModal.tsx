import React, { useState, useEffect } from "react";
import {
    Box,
    Modal,
    Typography,
    Input,
    IconButton,
    Tabs,
    Tab,
    Fade,
    Snackbar,
    Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import { LoadingButton } from "@mui/lab";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { updateUserEmail, updateUserPassword } from "../../store/reducers/action-creators/user";
import { clearUserState } from "../../store/reducers/UserSlice";

interface EditEmailAndPasswordModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
}

const EditEmailAndPasswordModal: React.FC<EditEmailAndPasswordModalProps> = ({ open, setOpen }) => {
    const { t } = useTranslation(["profile", "errors"]);
    const dispatch = useAppDispatch();
    const { user, loading, error, success } = useAppSelector((state) => state.user);

    const [tab, setTab] = useState<"email" | "password">("email");
    const [email, setEmail] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [snackbarType, setSnackbarType] = useState<"success" | "error">("success");
    const [snackbarMessage, setSnackbarMessage] = useState("");

    const validateEmail = (email: string) => /\S+@\S+\.\S+/.test(email);

    const resetForm = () => {
        setEmail("");
        setNewPassword("");
        setConfirmPassword("");
    };

    const handleClose = () => {
        resetForm();
        dispatch(clearUserState());
        setOpen(false);
    };

    const handleSave = async () => {
        if (!user) return;
        dispatch(clearUserState());

        if (tab === "email") {
            if (!email) {
                setSnackbarType("error");
                setSnackbarMessage(t("errors:error-empty-email"));
                setSnackbarOpen(true);
                return;
            }
            if (!validateEmail(email)) {
                setSnackbarType("error");
                setSnackbarMessage(t("errors:error-invalid-email"));
                setSnackbarOpen(true);
                return;
            }
            await dispatch(updateUserEmail({ userId: user.id, email }));
        } else {
            if (newPassword.length < 6) {
                setSnackbarType("error");
                setSnackbarMessage(t("errors:error-password-too-short"));
                setSnackbarOpen(true);
                return;
            }
            if (newPassword !== confirmPassword) {
                setSnackbarType("error");
                setSnackbarMessage(t("errors:error-passwords-dont-match"));
                setSnackbarOpen(true);
                return;
            }

            await dispatch(updateUserPassword({
                userId: user.id,
                newPassword,
            }));
        }
    };

    useEffect(() => {
        if (error) {
            setSnackbarType("error");
            setSnackbarMessage(error);
            setSnackbarOpen(true);
        }
        if (success && open) {
            setSnackbarType("success");
            setSnackbarMessage(
                tab === "email"
                    ? t("profile:email-updated-successfully")
                    : t("profile:password-updated-successfully")
            );
            setSnackbarOpen(true);

            handleClose()
        }
    }, [error, success]);

    return (
        <>
            <Modal open={open} onClose={handleClose}>
                <Fade in={open}>
                    <Box
                        sx={{
                            width: 500,
                            bgcolor: "var(--columbia-blue)",
                            borderRadius: 3,
                            p: 4,
                            mx: "auto",
                            mt: "10vh",
                            outline: "none",
                            position: "relative",
                            boxShadow: 10,
                        }}
                    >
                        <IconButton
                            onClick={handleClose}
                            sx={{ position: "absolute", top: 16, right: 16 }}
                        >
                            <CloseIcon />
                        </IconButton>

                        <Typography
                            variant="h5"
                            textAlign="center"
                            color="var(--dark-purple)"
                            fontWeight={700}
                            mb={2}
                        >
                            {t("profile:edit-email-password")}
                        </Typography>

                        <Tabs
                            value={tab}
                            onChange={(_, value) => {
                                setTab(value);
                                resetForm();
                                dispatch(clearUserState());
                            }}
                            centered
                            textColor="primary"
                            indicatorColor="primary"
                            sx={{ mb: 3 }}
                        >
                            <Tab value="email" label={t("profile:email")} />
                            <Tab value="password" label={t("profile:change-password")} />
                        </Tabs>

                        {tab === "email" ? (
                            <Box>
                                <Typography
                                    sx={{
                                        mb: 1,
                                        color: "var(--dark-purple)",
                                        fontWeight: 600,
                                    }}
                                >
                                    {t("profile:new-email")}
                                </Typography>
                                <Input
                                    fullWidth
                                    disableUnderline
                                    placeholder={t("profile:enter-new-email")}
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    sx={{
                                        border: "1px solid var(--berkeley-blue)",
                                        borderRadius: "10px",
                                        backgroundColor: "white",
                                        height: "46px",
                                        px: 2,
                                        mb: 3,
                                    }}
                                />
                            </Box>
                        ) : (
                            <Box>
                                <Input
                                    fullWidth
                                    disableUnderline
                                    type="password"
                                    placeholder={t("profile:enter-new-password")}
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    sx={{
                                        border: "1px solid var(--berkeley-blue)",
                                        borderRadius: "10px",
                                        backgroundColor: "white",
                                        height: "46px",
                                        px: 2,
                                        mb: 2,
                                    }}
                                />
                                <Input
                                    fullWidth
                                    disableUnderline
                                    type="password"
                                    placeholder={t("profile:confirm-new-password")}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    sx={{
                                        border: "1px solid var(--berkeley-blue)",
                                        borderRadius: "10px",
                                        backgroundColor: "white",
                                        height: "46px",
                                        px: 2,
                                        mb: 1,
                                    }}
                                />
                            </Box>
                        )}

                        <LoadingButton
                            fullWidth
                            variant="contained"
                            loading={loading}
                            onClick={handleSave}
                            sx={{
                                mt: 1,
                                backgroundColor: "var(--orange-peel)",
                                color: "var(--dark-purple)",
                                fontWeight: 700,
                                fontSize: "18px",
                                borderRadius: "10px",
                                textTransform: "none",
                                "&:hover": {
                                    backgroundColor: "#ffb020",
                                },
                            }}
                        >
                            {t("profile:save")}
                        </LoadingButton>
                    </Box>
                </Fade>
            </Modal>

            {/* Нижняя плашка (анимированная как раньше) */}
            <Snackbar
                open={snackbarOpen}
                autoHideDuration={3000}
                onClose={() => setSnackbarOpen(false)}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
                TransitionComponent={Fade}
            >
                <Alert
                    severity={snackbarType}
                    onClose={() => setSnackbarOpen(false)}
                    sx={{
                        width: "100%",
                        borderRadius: "10px",
                        fontWeight: 600,
                        backgroundColor:
                            snackbarType === "success"
                                ? "rgba(76, 175, 80, 0.9)"
                                : "rgba(244, 67, 54, 0.9)",
                        color: "white",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
                    }}
                >
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </>
    );
};

export default EditEmailAndPasswordModal;
