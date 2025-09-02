import type {FC} from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistSmallItem from "../items/playlist/PublicPlaylistSmallItem.tsx";
import type { PlaylistSimpleDto } from "../../models/DTO/PlaylistSimpleDto.ts";

interface PlaylistListProps {
    playlists: PlaylistSimpleDto[];
    itemWidth: number;
    name: string;
}

const TrackSmallCarouselList: FC<PlaylistListProps> = ({playlists, itemWidth, name}) => {
    return (
        <ListCarousel title={name} bgColor="var(--gradient-purple-rose)" textColor="var(--dark-purple)" variant={"h3"} gap={24} count_items={playlists.length}>
            {playlists.map((playlist, index) => (
                <PublicPlaylistSmallItem key={index} playlist={playlist} itemWidth={itemWidth} color="dark"/>
            ))}
        </ListCarousel>
    );
};

export default TrackSmallCarouselList; 