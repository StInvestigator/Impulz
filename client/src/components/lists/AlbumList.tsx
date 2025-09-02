import {Box} from "@mui/material";
import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";
import type {FC} from "react";
import type {AlbumSimpleDto} from "../../models/DTO/AlbumSimpleDto.ts";

interface AlbumListProps {
    albums: AlbumSimpleDto[]
}

const AlbumList:FC<AlbumListProps> = ({albums}) => {

    return (
        <Box display={"flex"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {albums.map(album =>
                <AlbumAverageItem key={album.id} album={album} itemHeight={360} color={"light"}/>
            )}
        </Box>
    );
};

export default AlbumList;