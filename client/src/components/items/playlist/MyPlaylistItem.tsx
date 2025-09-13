import {useState, type FC} from "react";
import { ListItem, ListItemButton, Box, Typography, ListItemIcon, ListItemText } from "@mui/material";
import { useTranslation } from 'react-i18next';

interface PlaylistProps {
    image: string,
    name: string,
    countTracks: number;
}

const MyPlaylistItem: FC<PlaylistProps> = ({ image, name, countTracks }) => {
    const [hover, setHover] = useState(false);
    const [active, setActive] = useState(false);

    const { t } = useTranslation('other')

    return (
        <ListItem disablePadding>
            <ListItemButton
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                onClick={() => setActive(!active)}
                sx={{
                    gap: 1,
                    transition: 'color 0.3s',
                    padding: "22px 12px",
                    color: active ? 'var(--berkeley-blue)' : (hover ? 'var(--deep-sky-blue)' : 'var(--columbia-blue)'),
                    '&:hover': {
                        color: 'var(--deep-sky-blue)',
                        '& .MuiTypography-root': {
                            color: 'var(--deep-sky-blue)',
                        },
                        '& .MuiListItemText-root': {
                            color: 'var(--deep-sky-blue)',
                        },
                    },
                    '&:active': {
                        color: 'var(--berkeley-blue)',
                        '& .MuiTypography-root': {
                            color: 'var(--berkeley-blue)',
                        },
                        '& .MuiListItemText-root': {
                            color: 'var(--berkeley-blue)',
                        },
                    }
                }}
                disableRipple
            >
                <ListItemIcon>
                    <Box component="img" src={image} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    sx={{
                        fontWeight:400,
                        fontSize: "16px",
                        color: 'inherit',
                    }}
                    primary={name}
                    secondary={
                        <Box
                            component="span"
                            sx={{
                                display: 'flex',
                                color: 'inherit',
                                alignItems: 'center',
                                mt: 0.5,
                            }}
                        >
                            <Typography
                                component="span"
                                variant={"mainRM"}
                                sx={{
                                    color: 'inherit',
                                }}
                            >
                                {t("title-playlist")} &middot; {countTracks} {t("title-song")}
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};

export default MyPlaylistItem;