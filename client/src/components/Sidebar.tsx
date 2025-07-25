import {
    Box,
    Button,
    Divider, IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material";
import mainImg from "../assets/sidebar/main.svg"
import libraryImg from "../assets/sidebar/library.svg"
import downloadImg from "../assets/sidebar/download.svg"
import subscriptionImg from "../assets/sidebar/subscription.svg"
import link from "../assets/sidebar/link.svg"
import createPlaylistImg from "../assets/sidebar/createPlaylist.svg"
import MyPlaylistList from "./lists/MyPlaylistList.tsx";

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
            <Box sx={{ paddingLeft: "24px" }}>

                <Box sx={{ display: 'flex' }}>
                    <IconButton
                        onClick={() => navigate('/')}
                        sx={{
                            margin: '20px 20px 20px auto',
                            border: 'none',
                            width: '20px',
                            height: '20px',
                            cursor: 'pointer',
                            padding: 0,
                        }}
                    >
                        <Box component={"img"} src={link}/>
                    </IconButton>
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