import React from 'react';
import {AppBar, Box, Button, Link, OutlinedInput, Toolbar, IconButton} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import {useNavigate} from "react-router-dom";
import frame from '../images/logo.svg'
import Dropdown from "./Dropdown";
import {useTranslation} from "react-i18next";


const Navbar = () => {
    const navigate = useNavigate()
    const { t } = useTranslation("navbar");

    const linkStyles = {
        display: "flex",
        alignItems: "center",
        textDecoration: "none",
        color: "inherit",
        fontSize: "14px",
        fontWeight: 600
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
                    width: "361px",
                    height: "30px",
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Dropdown/>
                    <Link href="#" sx={{...linkStyles, color: "#D9DADC"}}>
                        {t("registration")}
                    </Link>
                    <Button sx={{
                        backgroundColor: "#D9D9D9",
                        color: "black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        padding: "7px 15px",
                        fontFamily: 'Work Sans, sans-serif',
                        fontWeight: 600,
                    }}>
                        {t("login")}
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;