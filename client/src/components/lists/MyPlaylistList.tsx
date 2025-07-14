import React from 'react';
import {List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import playlistImage from "../../images/playlistImage.png"
import MyPlaylistItem from "../items/MyPlaylistItem";

const MyPlaylistList = () => {
    return (
        <List>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <MyPlaylistItem key={index} image={playlistImage} name={text} countTracks={10}/>
            ))}
        </List>
    );
};

export default MyPlaylistList;