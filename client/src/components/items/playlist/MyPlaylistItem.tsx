import type {FC} from "react";
import { ListItem, ListItemButton, Box, Typography, ListItemIcon, ListItemText } from "@mui/material";
import pushPinImage from "../../../assets/pushPin.svg"
import { useTranslation } from 'react-i18next';

interface PlaylistProps {
    image: string,
    name: string,
    countTracks: number;
}

const MyPlaylistItem: FC<PlaylistProps> = ({ image, name, countTracks }) => {

    const { t } = useTranslation('other')
    
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{
                gap: 1,
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#C7C7D3',
                },
                padding: "22px 12px",
            }}>
                <ListItemIcon>
                    <Box component="img" src={image} />
                </ListItemIcon>
                <ListItemText
                    disableTypography
                    sx={{fontWeight:400, fontSize: "16px", color: "var(--columbia-blue)"}}
                    primary={name}
                    secondary={
                        < Box
                            component="span"
                            sx={{ display: 'flex', color: "var(--columbia-blue)", alignItems: 'center', mt: 0.5 }}
                        >
                            <Box component="img" src={pushPinImage} />
                            <Typography
                                ml={0.5}
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