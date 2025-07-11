import React from 'react';
import {AppBar, Box, Button, Link, OutlinedInput, Toolbar, IconButton} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import frame from '../images/logo.png'

const Navbar = () => {
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
                    <img src={frame} alt="Impulz"/>
                    <Box component="form" sx={{width: "450px", display: "flex", position: "relative"}}>
                        <OutlinedInput placeholder="Пошук треків, альбомів, виконавців" sx={{width: "450px", backgroundColor: "#D9D9D9", borderRadius: "10px"}}/>
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
                    <Link href="#" sx={linkStyles}>
                        <LanguageIcon sx={{marginRight: "6px", width: "20px", height: "20px"}}/>
                        Українська
                    </Link>
                    <Link href="#" sx={{...linkStyles, color: "#D9DADC"}}>
                        Зареєструватися
                    </Link>
                    <Button sx={{
                        backgroundColor: "#D9D9D9",
                        color: "black",
                        borderRadius: "10px",
                        fontSize: "12px",
                        padding: "7px 15px",
                        fontFamily: 'Work Sans, sans-serif',
                        fontWeight: 600,
                    }}>Увійти</Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Navbar;