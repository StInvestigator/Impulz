import {AppBar, Box, Button, Link, OutlinedInput, Toolbar, IconButton, Typography} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import frame from '../assets/logo.svg'
import {useTranslation} from "react-i18next";
import Dropdown from "./Dropdown.tsx";
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import {memo} from "react";
import { useKeycloak } from "@react-keycloak/web";

const Navbar = memo(() => {
    const { keycloak } = useKeycloak();
    const { t } = useTranslation("navbar")
    const navigate = useAppNavigate()

    const linkStyles = {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
    };


    return (
        <AppBar sx={{backgroundColor: "black", zIndex: (theme) => theme.zIndex.drawer + 1}}>
            <Toolbar variant="dense" sx={{display:"flex", justifyContent: "space-between"}}>
                <Box sx={{
                    width: "766px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <IconButton onClick={() => navigate("/")}>
                        <Box component="img" src={frame} alt="Impulz"/>
                    </IconButton>
                    <Box component="form" sx={{width: "450px", display: "flex", position: "relative"}}>
                        <OutlinedInput placeholder={t("search")} sx={{width: "450px", backgroundColor: "#D9D9D9", borderRadius: "10px"}}/>
                        <IconButton sx={{width: "53px", height: "30px", backgroundColor: "white", borderRadius: "10px", position: "absolute", right: "0"}}>
                            <SearchIcon />
                        </IconButton>
                    </Box>
                </Box>
                <Box sx={{
                    width: "392px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Link variant={"mainSbL"} sx={linkStyles}>
                        <Dropdown/>
                    </Link>
                    <Link variant={"mainSbL"} sx={{...linkStyles, color: "#D9DADC"}} onClick={()=>keycloak.register()}>
                        {t("registration")}
                    </Link>
                    <Button sx={{
                        backgroundColor: "#D9D9D9",
                        color: "black",
                        borderRadius: "10px",
                        padding: "7px 15px",
                    }}>
                        <Typography variant={"mainSbL"} textTransform={"none"} onClick={()=>keycloak.login()}>
                            {t("login")}
                        </Typography>
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
});

export default Navbar;