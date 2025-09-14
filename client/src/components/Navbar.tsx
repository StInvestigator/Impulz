import {AppBar, Box, Button, OutlinedInput, Toolbar, IconButton, Typography} from "@mui/material";
import LogoIcon from '../assets/logo.svg'
import ProfileIcon from "../assets/profile_icon.svg"
import SearchIcon from "../assets/searchIcon.svg"
import {useTranslation} from "react-i18next";
import Dropdown from "./Dropdown.tsx";
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import {memo} from "react";
import { useKeycloak } from "@react-keycloak/web";
import LogoutButton from "./LogoutButton";

const Navbar = memo(() => {
    const { keycloak } = useKeycloak();
    const { t } = useTranslation("navbar")
    const navigate = useAppNavigate()

    return (
        <AppBar sx={{backgroundColor: "var(--columbia-blue)", zIndex: (theme) => theme.zIndex.drawer + 3}}>
            <Toolbar variant="dense" sx={{display:"flex", justifyContent: "space-between"}}>
                <Box sx={{
                    width: "766px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <IconButton disableRipple={true} onClick={() => navigate("/")}>
                        <Box  component="img" src={LogoIcon} alt="Impulz"/>
                    </IconButton>
                    <Box component="form" sx={{width: "450px", display: "flex", position: "relative"}}>
                        <OutlinedInput
                            placeholder={t("search")}
                            sx={{
                                width: "450px",
                                backgroundColor: "#FFFFFF",
                                borderRadius: "15px",
                                color: "#6B7280",
                                fontFamily: 'Work Sans, sans-serif',
                                fontSize: "12px",
                                fontWeight: 400,
                                '& .MuiInputBase-input::placeholder': {
                                    color: '#6B7280',
                                    opacity: 1,
                                }
                            }}
                        />
                        <IconButton
                            type="submit"
                            sx={{
                                width: "35px",
                                height: "25px",
                                marginLeft: "-50px",
                                marginTop: "10px",
                                '&:hover': {
                                    backgroundColor: 'transparent',
                                },
                                '&:active': {
                                    backgroundColor: 'transparent',
                                },
                                '&.Mui-focusVisible': {
                                    backgroundColor: 'transparent',
                                },
                            }}
                            disableRipple
                            // onClick={}
                        >
                            <Box height={45} width={30} component="img" src={SearchIcon}/>
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{
                    height: "30px",
                    display: "flex",
                    flexDirection: "row",
                    gap: "24px",
                }}>
                    <Box sx={{ position: 'relative' }}>
                        <Dropdown/>
                    </Box>
                    {
                        !keycloak.authenticated &&
                        <>
                            <Button variant="text" onClick={()=>keycloak.register()} sx={{
                                color: "var(--dark-purple)",
                            }}>
                                <Typography variant={"mainSbL"} textTransform={"none"}>
                                    {t("registration")}
                                </Typography>
                            </Button>
                            <Button onClick={()=>keycloak.login()} sx={{
                                backgroundColor: "var(--orange-peel)",
                                color: "var(--dark-purple)",
                                borderRadius: "10px",
                                padding: "7px 15px",
                            }}>
                                <Typography variant={"mainSbL"} textTransform={"none"}>
                                    {t("login")}
                                </Typography>
                            </Button>
                        </>
                    }
                    {
                        keycloak.authenticated &&
                        <>
                            <LogoutButton/>
                            <IconButton
                                disableRipple={true}
                                onDragStart={(e) => e.preventDefault()}
                                href={"/"}>
                                <Box height={35} width={35} component="img" src={ProfileIcon} alt="Profile"/>
                            </IconButton>
                        </>
                    }
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default Navbar;