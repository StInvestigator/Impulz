import {Box} from "@mui/material";
import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
import type {FC} from "react";

interface AlbumListProps {
    albums: string[]
}

const AlbumList:FC<AlbumListProps> = ({albums}) => {

    return (
        <Box display={"flex"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {albums.map(album =>
                <AlbumAverageItem key={album} album={album} itemHeight={360} color={"light"}/>
            )}
        </Box>
    );
};

export default AlbumList;