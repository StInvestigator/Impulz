import { Box, Typography, Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const NotFoundPage = () => {
    const { t } = useTranslation(["errors", "other"]);
    const navigate = useNavigate();

    const handleGoHome = () => {
        navigate("/");
    };

    const handleGoBack = () => {
        navigate(-1);
    };

    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "linear-gradient(135deg, var(--dark-purple) 0%, #2D1B69 100%)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "40px 20px",
                overflow: "hidden",
                zIndex: 9999,
            }}
        >
            {/* Декоративные элементы */}
            <Box
                sx={{
                    position: "absolute",
                    top: "10%",
                    left: "5%",
                    width: "200px",
                    height: "200px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, var(--orange-peel) 0%, transparent 70%)",
                    opacity: 0.1,
                    animation: "float 6s ease-in-out infinite",
                }}
            />
            <Box
                sx={{
                    position: "absolute",
                    bottom: "15%",
                    right: "8%",
                    width: "150px",
                    height: "150px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, var(--columbia-blue) 0%, transparent 70%)",
                    opacity: 0.1,
                    animation: "float 8s ease-in-out infinite",
                }}
            />

            {/* Основной контент */}
            <Box
                sx={{
                    textAlign: "center",
                    color: "white",
                    zIndex: 2,
                    maxWidth: "600px",
                }}
            >
                {/* Код ошибки */}
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: { xs: "120px", md: "180px" },
                        fontWeight: 900,
                        background: "linear-gradient(45deg, var(--orange-peel) 30%, #FFB74D 90%)",
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        lineHeight: 1,
                        marginBottom: "20px",
                        textShadow: "0 4px 20px rgba(255, 153, 0, 0.3)",
                    }}
                >
                    404
                </Typography>

                {/* Заголовок */}
                <Typography
                    variant="h2"
                    sx={{
                        fontSize: { xs: "24px", md: "32px" },
                        fontWeight: 700,
                        color: "var(--columbia-blue)",
                        marginBottom: "16px",
                        fontFamily: '"Manrope", sans-serif',
                    }}
                >
                    {t("errors:error-page-not-found")}
                </Typography>

                {/* Описание */}
                <Typography
                    variant="body1"
                    sx={{
                        fontSize: { xs: "16px", md: "18px" },
                        color: "rgba(255, 255, 255, 0.8)",
                        marginBottom: "40px",
                        lineHeight: 1.6,
                        maxWidth: "400px",
                        margin: "0 auto 40px",
                    }}
                >
                    {t("errors:error-page-not-found-description")}
                </Typography>

                {/* Кнопки действий */}
                <Box
                    sx={{
                        display: "flex",
                        gap: "20px",
                        justifyContent: "center",
                        flexWrap: "wrap",
                    }}
                >
                    <Button
                        onClick={handleGoHome}
                        sx={{
                            backgroundColor: "var(--orange-peel)",
                            color: "black",
                            padding: "12px 32px",
                            borderRadius: "50px",
                            fontSize: "16px",
                            fontWeight: 600,
                            textTransform: "none",
                            minWidth: "160px",
                            "&:hover": {
                                backgroundColor: "#FFB74D",
                                transform: "translateY(-2px)",
                                boxShadow: "0 8px 25px rgba(255, 153, 0, 0.3)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        {t("other:button-go-home")}
                    </Button>

                    <Button
                        onClick={handleGoBack}
                        variant="outlined"
                        sx={{
                            borderColor: "var(--columbia-blue)",
                            color: "var(--columbia-blue)",
                            padding: "12px 32px",
                            borderRadius: "50px",
                            fontSize: "16px",
                            fontWeight: 600,
                            textTransform: "none",
                            minWidth: "160px",
                            "&:hover": {
                                backgroundColor: "rgba(197, 228, 249, 0.1)",
                                borderColor: "var(--orange-peel)",
                                color: "var(--orange-peel)",
                                transform: "translateY(-2px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        {t("other:button-go-back")}
                    </Button>
                </Box>

                {/* Дополнительная информация */}
                <Typography
                    variant="caption"
                    sx={{
                        display: "block",
                        marginTop: "40px",
                        color: "rgba(255, 255, 255, 0.5)",
                        fontSize: "14px",
                    }}
                >
                    {t("errors:error-contact-support")}
                </Typography>
            </Box>

            {/* Анимация */}
            <style>
                {`
                @keyframes float {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-20px) rotate(180deg); }
                }
                `}
            </style>
        </Box>
    );
};

export default NotFoundPage;