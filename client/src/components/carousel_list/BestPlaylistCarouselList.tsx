import React, {FC} from 'react';
import AuthorItem from "../items/AuthorItem";
import ListCarousel from "../ListCarousel";
import PublicPlaylistItem from "../items/PublicPlaylistItem";

interface PlaylistListProps {
    playlists: string[];
    itemWidth: number;
}

const BestPlaylistCarouselList: FC<PlaylistListProps> = ({playlists, itemWidth}) => {
    return (
        <ListCarousel title={"Найкращі виконавці цього місяця"} font_size_title={24} count_items={playlists.length}>
            {playlists.map((playlist, index) => (
                <PublicPlaylistItem key={index} playlist={playlist} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default BestPlaylistCarouselList;