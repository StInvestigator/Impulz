import {Box, Typography} from "@mui/material";
import {useTranslation} from "react-i18next";
import {fetchUserDetails} from "../store/reducers/action-creators/user.ts";
import keycloak from "../keycloak.ts";
import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import type {AppDispatch, RootState} from "../store/store.ts";
import SettingSmallItem from "../components/SettingSmallItem.tsx";

function MyAccountPage() {
    const { t } = useTranslation("other");
    const dispatch = useDispatch<AppDispatch>();
    const { userDetail, loading, error } = useSelector((state: RootState) => state.user);

    useEffect(() => {
        const userId = keycloak.tokenParsed?.sub || keycloak.subject;
        if (userId) {
            dispatch(fetchUserDetails(userId));
        } else {
            console.error("User ID not found in Keycloak");
        }
    }, [dispatch]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }


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
                            {userDetail?.username}
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
                                {userDetail?.email}
                            </Typography>
                            <Typography>
                                -
                            </Typography>
                            <Typography>
                                -
                            </Typography>
                            <Typography>
                                -
                            </Typography>
                        </Box>

                        {/*<Box*/}
                        {/*    sx={{*/}
                        {/*        height: "52px",*/}
                        {/*        width: "144px",*/}
                        {/*        backgroundColor: "var(--orange-peel)",*/}
                        {/*        borderRadius: "50px",*/}
                        {/*    }}*/}
                        {/*>*/}
                        {/*    <Typography>*/}

                        {/*    </Typography>*/}
                        {/*</Box>*/}
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
                flexDirection="column"
                justifyContent="flex-start"
                alignItems="center"
                gap="16px"
                sx={{
                    backgroundColor: "var(--orange-peel-20)",
                    height: "190px",
                }}
            >
                <SettingSmallItem text={"123"} imgSrc={"./src/assets/PersonalInfoIcon.png"}/>
                <SettingSmallItem text={"123"} imgSrc={"./src/assets/PersonalInfoIcon.png"}/>
                <SettingSmallItem text={"123"} imgSrc={"./src/assets/PersonalInfoIcon.png"}/>
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
