import React, {FC} from 'react';
import ListCarousel from "../ListCarousel";
import PublicPlaylistItem from "../items/PublicPlaylistItem";

interface TracklistListProps {
    tracks: string[];
    itemWidth: number;
    name: string;
}

const TrackSmallCarouselList: FC<TracklistListProps> = ({tracks, itemWidth, name}) => {
    return (
        <ListCarousel title={name} font_size_title={24} gap={24} count_items={tracks.length}>
            {tracks.map((track, index) => (
                <PublicPlaylistItem key={index} playlist={track} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default TrackSmallCarouselList;