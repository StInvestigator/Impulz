import React, { FC } from 'react';
import { ListItem, ListItemButton, Box, Typography, ListItemIcon, ListItemText } from "@mui/material";
import pushPinImage from "../../images/pushPin.svg"

interface PlaylistProps {
    image: string,
    name: string,
    countTracks: number;
}

const MyPlaylistItem: FC<PlaylistProps> = ({ image, name, countTracks }) => {
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
                    sx={{fontWeight:600, fontSize: "14px"}}

                    primary={name}
                    secondary={
                        < Box
                            component="span"
                            sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
                        >
                            <Box component="img" src={pushPinImage} />
                            <Typography
                                variant="h4"
                                color="text.secondary"
                                ml={0.5}
                                component="span"
                                fontSize={12}
                            >
                                Плейліст &middot; {countTracks} пісень
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
        </ListItem >
    );
};

export default MyPlaylistItem;