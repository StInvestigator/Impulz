import TrackSmallItem from "../items/track/TrackSmallItem.tsx";

const tracks = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6"
]

const TrackList = () => {


    return (
        <>
            {tracks.map(track =>
                <TrackSmallItem key={track} track={track}/>
            )}
        </>
    );
};

export default TrackList;