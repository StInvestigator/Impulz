import React, { FC } from 'react';
import TrackItem from "../items/TrackItem";
import { Box } from "@mui/material";
import ListCarousel from "../ListCarousel";

interface TrackListProps {
    tracks: string[];
    itemWidth: number;
}

const TrackCarouselList: FC<TrackListProps> = ({ tracks, itemWidth }) => {
    return (
        <ListCarousel title={"Хіти тижня"} gap={24} font_size_title={64} count_items={tracks.length}>
            {tracks.map((track, index) => (
                <TrackItem key={index} track={track} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default TrackCarouselList;
