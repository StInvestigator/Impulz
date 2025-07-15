import React, {FC} from 'react';
import {ListItem, ListItemButton,Box,Typography, ListItemIcon, ListItemText} from "@mui/material";
import pushPinImage from "../../images/pushPin.png"

interface PlaylistProps {
    image: string,
    name: string,
    countTracks: number;
}

const MyPlaylistItem: FC<PlaylistProps> = ({image, name, countTracks}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#C7C7D3',
                }
            }}>
                <ListItemIcon sx={{paddingRight: "12px"}}>
                    <Box component="img" src={image}/>
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    secondary={
                        <Box
                            component="span"
                            sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}
                        >
                            <Box component="img" src={pushPinImage} />
                            <Typography
                                variant="body2"
                                color="text.secondary"
                                ml={0.5}
                                component="span"
                            >
                                Плейліст {countTracks} пісень
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};

export default MyPlaylistItem;