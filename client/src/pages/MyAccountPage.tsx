import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";

function MyAccountPage() {
    const { t } = useTranslation("other");

    return (
        <Box
            display="grid"
            gridTemplateColumns="1fr 1fr"
            gap="24px"
            margin="0 auto"
        >
            <Box
                borderRadius="16px"
                padding="24px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: "var(--dark-purple)",
                    height: "250px",
                    width: "765px"
                }}
            >
                <Box
                    display="grid"
                    gridTemplateColumns="260px 1fr"
                    justifyContent="left"
                    gap="24px"
                >
                    <Box>
                        <Box
                            sx={{
                                padding: '5px',
                                background: 'linear-gradient(to right, rgba(255, 153, 0, 0.8), rgba(217, 3, 104, 0.4), rgba(255, 153, 0, 1), rgba(217, 3, 104, 0.4), rgba(255, 153, 0, 0.8))',
                                borderRadius: '50%',
                                display: 'inline-block'
                            }}
                        >
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                borderRadius="50%"
                                height="245px"
                                width="245px"
                                sx={{
                                    backgroundColor: "var(--dark-purple)",
                                    backgroundRepeat: "no-repeat",
                                    backgroundPosition: "center",
                                    backgroundSize: "cover",
                                }}
                            />
                        </Box>
                    </Box>


                    <Box
                        sx={{
                            width: "475px",
                            display: "grid",
                            gridTemplateColumns: "1fr 1fr",
                        }}
                    >
                        {/* Заголовок занимающий обе колонки */}
                        <Typography
                            fontSize={"30px"}
                            color={"var(--orange-peel)"}
                            sx={{
                                gridColumn: "1 / -1",
                                textAlign: "left",
                                marginBottom: "-50px"
                            }}
                        >
                            Ваш заголовок над двумя колонками
                        </Typography>

                        {/* Левая колонка */}
                        <Box sx={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                            color: "var(--columbia-blue)",
                            fontWeight: "700",
                            fontSize: "14px",
                            '& .MuiTypography-root': {
                                color: "inherit",
                                fontWeight: "inherit",
                                fontSize: "inherit"
                            }
                        }}>
                            <Typography>
                                {t("email")}
                            </Typography>
                            <Typography>
                                {t("sex")}
                            </Typography>
                            <Typography>
                                {t("dd.mm.yyyy")}
                            </Typography>
                            <Typography>
                                {t("country")}
                            </Typography>
                        </Box>

                        {/* Правая колонка */}
                        <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                gap: "10px",
                                color: "var(--columbia-blue)",
                                fontSize: "14px",
                                '& .MuiTypography-root': {
                                    color: "inherit",
                                    fontWeight: "inherit",
                                    fontSize: "inherit"
                                }
                            }}
                        >
                            <Typography>
                                Текст справа 1
                            </Typography>
                            <Typography>
                                Текст справа 2
                            </Typography>
                            <Typography>
                                Текст справа 3
                            </Typography>
                            <Typography>
                                Текст справа 4
                            </Typography>
                        </Box>
                    </Box>

                </Box>
            </Box>

            <Box
                borderRadius="16px"
                padding="24px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: "var(--orange-peel-20)",
                    height: "290px",
                }}
            >
                Верхний правый
            </Box>

            <Box
                borderRadius="16px"
                padding="24px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: "var(--orange-peel-20)",
                    height: "190px",
                }}
            >
                Нижний левый
            </Box>

            <Box
                borderRadius="16px"
                padding="24px"
                display="flex"
                justifyContent="center"
                alignItems="center"
                sx={{
                    backgroundColor: "var(--orange-peel-20)",
                    height: "190px",
                }}
            >
                Нижний правый
            </Box>
        </Box>
    );
}

export default MyAccountPage;
