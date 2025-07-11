import React, {FC} from 'react';
import {ListItem, ListItemButton,Box,Typography, ListItemIcon, ListItemText} from "@mui/material";
import pushPinImage from "../../images/pushPin.png"

type PlaylistProps = {
    image: string,
    name: string,
    countTracks: number;
}

const PlaylistItem: FC<PlaylistProps> = ({image, name, countTracks}) => {
    return (
        <ListItem disablePadding>
            <ListItemButton sx={{
                transition: 'background-color 0.3s ease',
                '&:hover': {
                    backgroundColor: '#C7C7D3',
                }
            }}>
                <ListItemIcon sx={{paddingRight: "12px"}}>
                    <img src={image}/>
                </ListItemIcon>
                <ListItemText
                    primary={name}
                    secondary={
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                            <img src={pushPinImage}/>
                            <Typography variant="body2" color="text.secondary" ml={0.5}>
                                Плейліст {countTracks} пісень
                            </Typography>
                        </Box>
                    }
                />
            </ListItemButton>
        </ListItem>
    );
};

export default PlaylistItem;