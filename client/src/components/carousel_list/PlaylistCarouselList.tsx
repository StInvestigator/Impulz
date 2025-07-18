import React, {FC} from 'react';
import AuthorItem from "../items/AuthorItem";
import ListCarousel from "../ListCarousel";
import PublicPlaylistItem from "../items/PublicPlaylistItem";

interface PlaylistListProps {
    playlists: string[];
    itemWidth: number;
    name: string;
}

const PlaylistCarouselList: FC<PlaylistListProps> = ({playlists, itemWidth, name}) => {
    return (
        <ListCarousel title={name} font_size_title={24} gap={24} count_items={playlists.length}>

            {playlists.map((playlist, index) => (
                <PublicPlaylistItem key={index} playlist={playlist} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default PlaylistCarouselList;