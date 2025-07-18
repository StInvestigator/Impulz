import React, {FC} from 'react';
import AuthorItem from "../items/AuthorItem";
import ListCarousel from "../ListCarousel";
import PublicPlaylistItem from "../items/PublicPlaylistItem";

interface PlaylistListProps {
    playlists: string[];
    itemWidth: number;
}

const RecommendTodayCarouselList: FC<PlaylistListProps> = ({playlists, itemWidth}) => {
    return (
        <ListCarousel title={"Рекомендації за сьогодні"} font_size_title={24} gap={24} count_items={playlists.length}>
            {playlists.map((playlist, index) => (
                <PublicPlaylistItem key={index} playlist={playlist} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default RecommendTodayCarouselList;