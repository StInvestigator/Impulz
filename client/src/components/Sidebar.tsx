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
import mainImg from "../images/main.png"
import libraryImg from "../images/library.png"
import downloadImg from "../images/download.png"
import subscriptionImg from "../images/subscription.png"
import createPlaylistImg from "../images/createPlaylist.png"
import MyPlaylistList from "./lists/MyPlaylistList";

import { useNavigate } from 'react-router-dom';

const buttons = [
    {
        name: "Головна",
        icon: mainImg,
        path: "/"
    },
    {
        name: "Бібліотека",
        icon: libraryImg,
        path: "/library"
    },
    {
        name: "Завантажити",
        icon: downloadImg,
        path: "/downloads"
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
            <Box sx={{paddingLeft: "24px"}}>
                <List>
                    {buttons.map(({name, icon, path}) => (
                        <ListItem key={name} disablePadding>
                            <ListItemButton onClick={() => navigate(path)}
                            sx={{
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#C7C7D3',
                                }
                            }}>
                                <ListItemIcon>
                                    <Box component="img" src={icon}/>
                                </ListItemIcon>
                                <ListItemText primary={name} primaryTypographyProps={{
                                    variant: 'h3',
                                }}/>
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ backgroundColor: 'black', height: '2px' }} />
                <Button sx={{
                    margin: "16px 54px",
                    height: "32px",
                    border: "1px solid black",
                    borderRadius: "10px",
                    fontSize: "12px",
                    fontWeight: 400,
                    color: "black"
                }}>
                    <Box component="img" src={createPlaylistImg} style={{paddingRight: "10px"}}/>
                    Створити плейлист
                </Button>
                <MyPlaylistList/>
            </Box>
        </Box>
    );
};

export default Sidebar;