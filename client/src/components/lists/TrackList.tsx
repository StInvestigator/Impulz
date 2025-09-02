import TrackSmallItem from "../items/track/TrackSmallItem.tsx";
import type { TrackSimpleDto } from "../../models/DTO/TrackSimpleDto.ts";

interface TrackListProps {
    tracks: TrackSimpleDto[];
}

const TrackList = ({ tracks }: TrackListProps) => {
    if (!tracks || tracks.length === 0) {
        return <div>Empty</div>;
    }

    return (
        <>
            {tracks.map((track,index) =>
                <TrackSmallItem key={track.id} track={track} index={index}/>
            )}
        </>
    );
};

export default TrackList;