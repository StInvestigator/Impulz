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
import { useTranslation } from 'react-i18next';
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import {memo} from "react";

const buttons = [
    {
        name: "button-main",
        icon: mainImg,
        path: "/"
    },
    {
        name: "button-library",
        icon: libraryImg,
        path: "/library",
    },
    {
        name: "button-download",
        icon: downloadImg,
        path: "/downloads",
    },
    {
        name: "button-subscribe",
        icon: subscriptionImg,
        path: "/subscriptions"
    }
]


const Sidebar = memo(() => {

    const navigate = useAppNavigate()

    const { t } = useTranslation('sidebar')

    return (
        <Box
            component="aside"
            sx={{
                width: "320px",
                height: "calc(100vh - 48px)",
                overflowY: 'auto',
                marginTop: "48px",
                position: "fixed",
                backgroundColor: "var(--dark-purple)",
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
                                <ListItemText primary={t(`${name}`)} disableTypography sx={{fontSize:"16px", fontWeight:600, color: "var(--orange-peel)" }} />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ backgroundColor: 'var(--columbia-blue)', height: '1px', marginTop: "24px" }} />
                <Button sx={{
                    margin: "30px 53px 60px",
                    height: "32px",
                    border: "1px solid var(--columbia-blue)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "var(--columbia-blue)",
                    padding: "6px 12px",
                    textTransform: "none"
                }}>
                    <Box component="img" src={createPlaylistImg} color={"var(--columbia-blue)"} style={{ paddingRight: "10px" }} />
                    {t("button-create-playlist")}
                </Button>
                <MyPlaylistList />
            </Box>
        </Box>
    );
});

export default Sidebar;