import TrackSmallItem from "../items/track/TrackSmallItem.tsx";
import { useAppSelector } from "../../hooks/redux.ts";
import type {TrackSimpleDto} from "../../models/DTO/track/TrackSimpleDto.ts";

interface TrackListProps {
    tracks: TrackSimpleDto[];
}

const TrackList = ({ tracks }: TrackListProps) => {
    const { currentPage } = useAppSelector(state => state.page);

    if (!tracks || tracks.length === 0) {
        return <div>Empty</div>;
    }

    return (
        <>
            {tracks.map((track,index) =>
                <TrackSmallItem key={track.id} track={track} index={(currentPage - 1) * 5 + index}/>
            )}
        </>
    );
};

export default TrackList;