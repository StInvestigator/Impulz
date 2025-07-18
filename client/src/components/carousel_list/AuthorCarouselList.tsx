import React, {FC} from 'react';
import TrackItem from "../items/TrackItem";
import ListCarousel from "../ListCarousel";
import AuthorItem from "../items/AuthorItem";

interface AuthorListProps {
    authors: string[];
    itemWidth: number;
}

const AuthorCarouselList: FC<AuthorListProps> = ({authors, itemWidth}) => {
    return (
        <ListCarousel title={"Найкращі виконавці цього місяця"} gap={24} font_size_title={24} count_items={authors.length}>
            {authors.map((author, index) => (
                <AuthorItem key={index} author={author} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default AuthorCarouselList;