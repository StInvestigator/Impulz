import {List} from "@mui/material";
import playlistImage from "../../assets/sidebar/playlistImage.svg"
import MyPlaylistItem from "../items/playlist/MyPlaylistItem.tsx";

const MyPlaylistList = () => {
    return (
        <List disablePadding>
            {['All mail', 'Trash', 'Spam'].map((text, index) => (
                <MyPlaylistItem key={index} image={playlistImage} name={text} countTracks={10}/>
            ))}
        </List>
    );
};

export default MyPlaylistList;