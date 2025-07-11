import React from 'react';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import playlistImage from "../../images/playlistImage.png"
import PlaylistItem from "../items/PlaylistItem";

const PlaylistList = () => {
    return (
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <PlaylistItem image={playlistImage} name={text} countTracks={10}/>
            ))}
        </List>
    );
};

export default PlaylistList;