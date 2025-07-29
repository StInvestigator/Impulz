import type {FC} from "react";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";
import ListCarousel from "../ListCarousel.tsx";

interface TrackListProps {
    tracks: string[];
    itemWidth: number;
    itemHeight: number;
    name: string;
}

const TrackBigCarouselList: FC<TrackListProps> = ({ tracks, itemWidth, itemHeight, name }) => {
    return (
        <ListCarousel title={name} gap={24} font_size_title={64} count_items={tracks.length}>
            {tracks.map((track, index) => (
                <TrackAverageItem key={index} track={track} itemHeight={itemHeight} itemWidth={itemWidth} isMedal/>
            ))}
        </ListCarousel>
    );
};

export default TrackBigCarouselList;
