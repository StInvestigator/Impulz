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

    const { t } = useTranslation('other')
    
    return (
        <ListItem disablePadding>
            <ListItemButton 
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}
                sx={{
                    gap: 1,
                    transition: 'color 0,3s',
                    padding: "22px 12px",
                    '&:hover': {
                        color: 'var(--deep-sky-blue)', // цвет текста при наведении
                        '& .MuiTypography-root': {
                            color: 'var(--deep-sky-blue)', // для Typography внутри
                        },
                        '& .MuiListItemText-root': {
                            color: 'var(--deep-sky-blue)', // для основного текста
                        },
                    },
            }}>
                <ListItemIcon>
                    <Box component="img" src={image} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    sx={{
                        fontWeight:400, 
                        fontSize: "16px", 
                        color: hover ? "var(--deep-sky-blue)" : "var(--columbia-blue)",
                    }}
                    primary={name}
                    secondary={
                        < Box
                            component="span"
                            sx={{ 
                                display: 'flex', 
                                color: 'inherit', // наследует цвет от Box
                                alignItems: 'center', 
                                mt: 0.5 ,
                            }}
                        >
                            <Typography
                                component="span"
                                variant={"mainRM"}
                            >
                                {t("title-playlist")} &middot; {countTracks} {t("title-song")}
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
        </ListItem >
    );
};

export default MyPlaylistItem;