import type {FC} from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistItem from "../items/PublicPlaylistItem.tsx";

interface TracklistListProps {
    tracks: string[];
    itemWidth: number;
    name: string;
}

const TrackSmallCarouselList: FC<TracklistListProps> = ({tracks, itemWidth, name}) => {
    return (
        <ListCarousel title={name}  variant={"h3"} gap={24} count_items={tracks.length}>
            {tracks.map((track, index) => (
                <PublicPlaylistItem key={index} playlist={track} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default TrackSmallCarouselList; 