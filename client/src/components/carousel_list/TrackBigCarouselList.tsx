import type {FC} from "react";
import TrackItem from "../items/TrackItem.tsx";
import ListCarousel from "../ListCarousel.tsx";

interface TrackListProps {
    tracks: string[];
    itemWidth: number;
    name: string;
}

const TrackBigCarouselList: FC<TrackListProps> = ({ tracks, itemWidth, name }) => {
    return (
        <ListCarousel title={name} gap={24} font_size_title={64} count_items={tracks.length}>
            {tracks.map((track, index) => (
                <TrackItem key={index} track={track} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default TrackBigCarouselList;
