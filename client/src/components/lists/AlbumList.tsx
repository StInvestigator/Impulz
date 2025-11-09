import {Box} from "@mui/material";
import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
import type {FC} from "react";
import type {AlbumSimpleDto} from "../../models/DTO/album/AlbumSimpleDto.ts";

interface AlbumListProps {
    albums: AlbumSimpleDto[]
}

const AlbumList:FC<AlbumListProps> = ({albums}) => {

    return (
        <Box display="grid" sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {albums.map(album =>
                <AlbumAverageItem key={album.id} album={album} itemHeight={360}/>
            )}
        </Box>
    );
};

export default AlbumList;