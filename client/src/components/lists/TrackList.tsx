import TrackSmallItem from "../items/track/TrackSmallItem.tsx";
import { useAppSelector } from "../../hooks/redux.ts";
import type { TrackSimpleDto } from "../../models/DTO/track/TrackSimpleDto.ts";

interface TrackListProps {
    tracks: TrackSimpleDto[];
    pageSize?: number;
    playlistId? : number
}

const TrackList = ({ tracks, pageSize = 5, playlistId }: TrackListProps) => {
    const { currentPage } = useAppSelector(state => state.page);

    if (!tracks || tracks.length === 0) {
        return <div>Empty</div>;
    }

    return (
        <>
            {tracks.map((track, index) =>
                <TrackSmallItem playlistId={playlistId} key={track.id} track={track} index={(currentPage - 1) * pageSize + index} />
            )}
        </>
    );
};

export default TrackList;