import { Box } from "@mui/material";
import type { FC } from "react";
import { isAlbumSimpleDto, type MediaItemSimpleDto } from "../../models/DTO/MediaItemSimpleDto";
import Skeleton from "@mui/material/Skeleton";
import AlbumAverageItem from "../items/album/AlbumAverageItem.tsx";

interface MediaListProps {
    medias: MediaItemSimpleDto[];
    isLoading?: boolean;
    error?: string | null;
}

const MediaList: FC<MediaListProps> = ({ medias, isLoading = false, error = null }) => {
    if (isLoading) {
        return (
            <Box display={"grid"} sx={{
                gridTemplateColumns: "repeat(5, 1fr)"
            }} gap={3}>
                {[...Array(10)].map((_, index) => (
                    <Skeleton
                        key={index}
                        variant="rectangular"
                        width="100%"
                        height="280px"
                        sx={{ borderRadius: "10px" }}
                    />
                ))}
            </Box>
        );
    }

    if (error) {
        return (
            <Box>
                {error}
            </Box>
        );
    }

    const albums = medias.filter(media => isAlbumSimpleDto(media));

    return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {
                albums.map((album) =>
                        isAlbumSimpleDto(album) && (
                            <AlbumAverageItem
                                key={album.id}
                                album={album}
                                itemWidth={290}
                                itemHeight={360}
                            />
                        )
                )
            }
        </Box>
    );
}

export default MediaList;