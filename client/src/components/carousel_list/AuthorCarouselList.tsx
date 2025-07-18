import React, {FC} from 'react';
import TrackItem from "../items/TrackItem";
import ListCarousel from "../ListCarousel";
import AuthorItem from "../items/AuthorItem";

interface AuthorListProps {
    authors: string[];
    itemWidth: number;
    name: string;
}

const AuthorCarouselList: FC<AuthorListProps> = ({authors, itemWidth, name}) => {
    return (
        <ListCarousel title={name} font_size_title={24} count_items={authors.length}>
            {authors.map((author, index) => (
                <AuthorItem key={index} author={author} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default AuthorCarouselList;