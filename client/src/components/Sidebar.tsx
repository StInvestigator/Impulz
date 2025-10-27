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
import befomeAuthorImg from "../assets/sidebar/befomeAuthor.svg"
import MyPlaylistList from "./lists/MyPlaylistList.tsx";
import { useTranslation } from 'react-i18next';
import {useAppNavigate} from "../hooks/useAppNavigate.ts";
import {memo, Suspense, useState} from "react";
import { useLocation } from "react-router-dom";
import CreatePlaylistModal from "./ui/CreatePlaylistModal.tsx";
import {useKeycloak} from "@react-keycloak/web";
import { useAppDispatch, useAppSelector } from "../hooks/redux.ts";
import { befomeAuthor } from "../store/reducers/action-creators/author.ts";
import LikedPlaylist from "./items/playlist/LikedPlaylist.tsx";

const buttonsDefault = [
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
        name: "button-subscribe",
        icon: subscriptionImg,
        path: "/subscriptions"
    }
]

const buttonsAuthor = [
    {
        name: "button-download",
        icon: downloadImg,
        path: "/officeArtist",
    },
]


const buttonsUser = [
    {
        name: "button-author",
        icon: befomeAuthorImg,
        action: "becomeAuthor"
    }
]

interface ButtonItemProps {
    name: string;
    icon: string;
    path?: string;
    action?: string;
}

const ButtonItem: React.FC<ButtonItemProps> = ({ name, icon, path, action }) => {
    const { profile } = useAppSelector(state => state.profile);
    const navigate = useAppNavigate()
    const { t } = useTranslation('sidebar')
    const location = useLocation();
    const dispatch = useAppDispatch();

    const handleClick = () => {
        if (path) {
            navigate(path);
        } else if (action === "becomeAuthor") {
            dispatch(befomeAuthor(profile.id));
            window.location.reload()
        }
    };

    return (
        <ListItem key={name} disablePadding>
            <ListItemButton
                onClick={handleClick}
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
    );
}

const Sidebar = memo(() => {

    const {profile} = useAppSelector(state => state.profile);
    const { t } = useTranslation('sidebar')
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { keycloak } = useKeycloak();

    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation();
    };

    return (
        <Suspense>
            <Box
                component="aside"
                onWheel={handleWheel}
                sx={{
                    width: "320px",
                    height: "calc(100vh - 48px)",
                    overflowY: 'auto',
                    marginTop: "48px",
                    position: "fixed",
                    backgroundColor: "var(--dark-purple)",
                    '&::-webkit-scrollbar': {
                        display: 'none',
                    },
                    scrollbarWidth: 'none',
                    msOverflowStyle: 'none',
                }}
            >
                <Box sx={{ paddingLeft: "24px" }}>
                    <List disablePadding sx={{marginTop:"50px"}}>
                        {buttonsDefault.map(({ name, icon, path }) => (
                            <ButtonItem key={name} name={name} icon={icon} path={path} />
                        ))}
                        {profile.authorDto ? buttonsAuthor.map(({ name, icon, path }) => (
                            <ButtonItem key={name} name={name} icon={icon} path={path} />
                        )) : (
                            buttonsUser.map(({ name, icon, action }) => (
                                <ButtonItem key={name} name={name} icon={icon} action={action} />
                            ))
                        )}
                    </List>
                    <Divider sx={{ backgroundColor: 'var(--columbia-blue)', height: '0.1px', width: '270px', marginTop: "24px" }} />
                    {
                        keycloak.authenticated &&
                        <>
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
                        </>
                    }

                    {keycloak.authenticated && (
                        <Box
                            sx={{
                                marginTop: "-40px",
                                marginBottom: "100px"
                            }}
                        >
                            <LikedPlaylist/>
                            <MyPlaylistList/>
                        </Box>
                    )}

                </Box>
            </Box>
        </Suspense>
    );
});

export default Sidebar;