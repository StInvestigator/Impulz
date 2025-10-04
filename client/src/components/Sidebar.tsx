import {
    Box,
    Button,
    Divider,
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
import createPlaylistImg from "../assets/sidebar/createPlaylist.svg"
import MyPlaylistList from "./lists/MyPlaylistList.tsx";
import { useTranslation } from 'react-i18next';
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import {memo, useState} from "react";
import { useLocation } from "react-router-dom";
import CreatePlaylistModal from "./ui/CreatePlaylistModal.tsx";

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
    const location = useLocation();
    const [isModalOpen, setIsModalOpen] = useState(false);

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



                <List disablePadding sx={{marginTop:"50px"}}>
                    {buttons.map(({ name, icon, path }) => (
                        <ListItem key={name} disablePadding>
                            <ListItemButton
                                onClick={() => navigate(path)}
                                sx={{
                                    height: "60px",
                                    transition: 'background-color 0.3s ease',
                                    padding: "0 12px",
                                    margin: location.pathname === path ? "0 0 20px 0" : "0 24px 20px 0",
                                    borderRadius: location.pathname === path ? "10px 0 0 10px" : "10px",
                                    gap: "24px",
                                    backgroundColor: location.pathname === path ? 'white' : 'transparent',
                                    color: location.pathname === path ? "var(--berkeley-blue)" : "var(--orange-peel)",
                                    '&:hover': {
                                        backgroundColor: location.pathname === path ? 'white' : 'var(--orange-peel-20)',
                                        color: location.pathname === path ? "var(--berkeley-blue)" : "var(--orange-peel)"
                                    },
                                    '&:active': {
                                        backgroundColor: location.pathname === path ? 'white' : 'var(--orange-peel-20)',
                                        color: location.pathname === path ? "var(--berkeley-blue)" : "var(--orange-peel)"
                                    },
                                    '&.Mui-focusVisible': {
                                        backgroundColor: 'transparent',
                                    }
                                }}
                                disableRipple
                            >
                                <ListItemIcon sx={{ minWidth: 50 }}>
                                    <Box component="img" src={icon} sx={{ width: '50px', height: '50px' }}/>
                                </ListItemIcon>
                                <ListItemText
                                    primary={t(`${name}`)}
                                    disableTypography
                                    sx={{fontSize:"16px", fontWeight:600 }}
                                />
                            </ListItemButton>
                        </ListItem>
                    ))}
                </List>
                <Divider sx={{ backgroundColor: 'var(--columbia-blue)', height: '0.1px', width: '270px', marginTop: "24px" }} />
                <Button onClick={() => setIsModalOpen(true)} sx={{
                    margin: "30px 53px 60px",
                    height: "32px",
                    border: "1px solid var(--columbia-blue)",
                    borderRadius: "10px",
                    fontSize: "14px",
                    fontWeight: 400,
                    color: "var(--columbia-blue)",
                    padding: "6px 12px",
                    textTransform: "none",
                }}>
                    <Box component="img" src={createPlaylistImg} color={"var(--columbia-blue)"} style={{ paddingRight: "10px" }} />
                    {t("button-create-playlist")}
                </Button>
                <CreatePlaylistModal open={isModalOpen} setOpen={setIsModalOpen}/>

                <MyPlaylistList />
            </Box>
        </Box>
    );
});

export default Sidebar;