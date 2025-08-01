import type {FC} from "react";
import ListCarousel from "../ListCarousel.tsx";
import PublicPlaylistItem from "../items/PublicPlaylistItem.tsx";

interface PlaylistListProps {
    playlists: string[];
    itemWidth: number;
    name: string;
}

const PlaylistCarouselList: FC<PlaylistListProps> = ({playlists, itemWidth, name}) => {
    return (
        <ListCarousel title={name} variant={"h3"} gap={24} count_items={playlists.length}>
            {playlists.map((playlist, index) => (
                <PublicPlaylistItem key={index} playlist={playlist} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default PlaylistCarouselList;