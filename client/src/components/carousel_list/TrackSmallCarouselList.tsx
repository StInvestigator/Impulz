import type {FC} from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistSmallItem from "../items/playlist/PublicPlaylistSmallItem.tsx";

interface TracklistListProps {
    tracks: string[];
    itemWidth: number;
    name: string;
}

const TrackSmallCarouselList: FC<TracklistListProps> = ({tracks, itemWidth, name}) => {
    return (
        <ListCarousel title={name} variant={"h3"} gap={24} count_items={tracks.length}>
            {tracks.map((track, index) => (
                <PublicPlaylistSmallItem
                    key={index}
                    playlist={{
                        id: index,
                        title: track,
                        imgUrl: "",
                        createdAt: new Date("2022-02-02"),
                        owner: {
                            id: "1",
                            name: "Владелец плейлиста",
                            imgUrl: ""
                        },
                    }}
                    itemWidth={itemWidth}
                />
            ))}
        </ListCarousel>
    );
};
export default TrackSmallCarouselList;