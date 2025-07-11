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
import PlaylistList from "./lists/PlaylistList";

const buttons = [
    {
        name: "Головна",
        icon: mainImg,
    },
    {
        name: "Бібліотека",
        icon: libraryImg,
    },
    {
        name: "Завантажити",
        icon: downloadImg,
    },
    {
        name: "Підписка",
        icon: subscriptionImg,
    }
]

const Sidebar = () => {
    return (
        <Box
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
                    {buttons.map(({name, icon}) => (
                        <ListItem key={name} disablePadding>
                            <ListItemButton sx={{
                                transition: 'background-color 0.3s ease',
                                '&:hover': {
                                    backgroundColor: '#C7C7D3',
                                }
                            }}>
                                <ListItemIcon>
                                    <img src={icon}/>
                                </ListItemIcon>
                                <ListItemText primary={name} />
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
                    <img src={createPlaylistImg} style={{paddingRight: "10px"}}/>
                    Створити плейлист
                </Button>
                <PlaylistList/>
            </Box>
        </Box>
    );
};

export default Sidebar;