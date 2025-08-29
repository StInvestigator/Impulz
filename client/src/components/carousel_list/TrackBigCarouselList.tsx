import type {FC} from "react";
import TrackAverageItem from "../items/track/TrackAverageItem.tsx";
import ListCarousel from "../ListCarousel.tsx";
import type {TypographyProps} from "@mui/material";
import type {TrackSimpleDto} from "../../models/DTO/TrackSimpleDto.ts";

interface TrackListProps {
    tracks: TrackSimpleDto[];
    title: string,
    variant: TypographyProps['variant'];
    itemWidth: number;
    itemHeight: number;
}

const TrackBigCarouselList: FC<TrackListProps> = ({ tracks, itemWidth, itemHeight, title, variant }) => {
    return (
        <ListCarousel gap={24} count_items={tracks.length} variant={variant} title={title}>
            {tracks.map((track, index) => (
                <TrackAverageItem key={index} track={track} itemHeight={itemHeight} itemWidth={itemWidth} isMedal/>
            ))}
        </ListCarousel>
    );
};

export default TrackBigCarouselList;
