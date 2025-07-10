import React from 'react';
import {AppBar, Box, Button, Link, OutlinedInput, Toolbar, IconButton} from "@mui/material";
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import frame from '../images/Frame.png'

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
        <>
            <AppBar sx={{backgroundColor: "black"}}>
                <Toolbar variant="dense" sx={{display:"flex", justifyContent: "space-between"}}>
                    <Box width={"766px"} display={"flex"} justifyContent={"space-between"}>
                        <img src={frame}/>

                        <form style={{width: "450px", display: "flex", position: "relative"}}>
                            <OutlinedInput sx={{height: "30px", width: "450px", backgroundColor: "#D9D9D9", borderRadius: "10px"}}/>
                            <IconButton sx={{height: "30px", width: "60px", backgroundColor: "white", borderRadius: "10px", position: "absolute", left: "87%"}}>
                                <SearchIcon />
                            </IconButton>
                        </form>
                    </Box>
                    <Box width={"361px"} display={"flex"} justifyContent={"space-between"}>
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
                            fontWeight: 600,
                        }}>Увійти</Button>
                    </Box>
                </Toolbar>
            </AppBar>
        </>
    );
};

export default Navbar;