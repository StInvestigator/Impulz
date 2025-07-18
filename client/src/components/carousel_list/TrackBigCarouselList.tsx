import React, { FC } from 'react';
import TrackItem from "../items/TrackItem";
import { Box } from "@mui/material";
import ListCarousel from "../ListCarousel";

interface TrackListProps {
    tracks: string[];
    itemWidth: number;
    name: string;
}

const TrackBigCarouselList: FC<TrackListProps> = ({ tracks, itemWidth, name }) => {
    return (
        <ListCarousel title={name} gap={24} font_size_title={64} count_items={tracks.length}>ent/src/components/carousel_list/TrackCarouselList.tsx
            {tracks.map((track, index) => (
                <TrackItem key={index} track={track} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default TrackBigCarouselList;
