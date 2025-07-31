import React from 'react';
import {
    Box,
    Button,
    Divider,
    Drawer, Icon,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar
} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import mainImg from "../images/sidebar/main.svg"
import libraryImg from "../images/sidebar/library.svg"
import downloadImg from "../images/sidebar/download.svg"
import subscriptionImg from "../images/sidebar/subscription.svg"
import link from "../images/sidebar/link.svg"
import createPlaylistImg from "../images/sidebar/createPlaylist.svg"
import MyPlaylistList from "./lists/MyPlaylistList";

import { redirect, useNavigate } from 'react-router-dom';
import { Image } from '@mui/icons-material';

const buttons = [
    {
        name: "Головна",
        icon: mainImg,
        path: "/"
    },
    {
        name: "Бібліотека",
        icon: libraryImg,
        path: "/library",
    },
    {
        name: "Завантажити",
        icon: downloadImg,
        path: "/downloads",
    },
    {
        name: "Підписка",
        icon: subscriptionImg,
        path: "/subscriptions"
    }
]


const Sidebar = () => {

    const navigate = useNavigate();

    return (
        <Box
            component="aside"
            sx={{
                width: "320px",
                height: "calc(100vh - 48px)",
                overflowY: 'auto',
                marginTop: "48px",
                position: "fixed",
                backgroundColor: "#887D7D",
            }}
        >
            <Box sx={{ paddingLeft: "24px" }}>

                <Box sx={{ display: 'flex' }}>
                    <Box
                        component="button"
                        onClick={() => navigate('/')}
                        sx={{
                            backgroundImage: `url(${link})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundColor: 'transparent',
                            margin: '20px 20px 20px auto',
                            border: 'none',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    />
                </Box>

                <List disablePadding>
                    {buttons.map(({ name, icon, path }) => (
                        <ListItem key={name} disablePadding>
                            <ListItemButton onClick={() => navigate(path)}
                                sx={{
                                    transition: 'background-color 0.3s ease',
                                    '&:hover': {
                                        backgroundColor: '#C7C7D3',
                                    },
                                    padding: "22px 12px"
                                }}>
                                <ListItemIcon>
                                    <Box component="img" src={icon} />
                                </ListItemIcon>
                                <ListItemText primary={name} disableTypography sx={{fontSize:"16px", fontWeight:600}} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ backgroundColor: 'black', height: '1px', marginTop: "24px" }} />
                <Button sx={{
                    margin: "30px 53px 60px",
                    height: "32px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "black",
                    padding: "6px 12px",
                    textTransform: "none"
                }}>
                    <Box component="img" src={createPlaylistImg} style={{ paddingRight: "10px" }} />
                    Створити плейліст
                </Button>
                <MyPlaylistList />
            </Box>
        </Box>
    );
};

export default Sidebar;