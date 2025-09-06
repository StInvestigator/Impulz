import { Box } from "@mui/material";
import type { FC } from "react";
import { isTrackSimpleDto, type MediaItemSimpleDto } from "../../models/DTO/MediaItemSimpleDto";
import TrackAverageItem from "../items/track/TrackAverageItem";

interface MediaListProps {
    medias: MediaItemSimpleDto[]
}

const MediaList: FC<MediaListProps> = ({medias}) => {
  return (
        <Box display={"grid"} sx={{
            gridTemplateColumns: "repeat(5, 1fr)"
        }} gap={3}>
            {
                medias.map((media, index) => 
                    isTrackSimpleDto(media) && <TrackAverageItem key={index} track={media} itemHeight={280}/>
                )
            }
        </Box>
    );
}

export default MediaList