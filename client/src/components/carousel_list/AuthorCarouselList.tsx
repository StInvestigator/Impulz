import ListCarousel from "../ListCarousel.tsx";
import AuthorSmallItem from "../items/author/AuthorSmallItem.tsx";
import type {FC} from "react";

interface AuthorListProps {
    authors: string[];
    itemWidth: number;
    name: string;
}

const AuthorCarouselList: FC<AuthorListProps> = ({authors, itemWidth, name}) => {
    return (
        <ListCarousel title={name} gap={24} font_size_title={20} count_items={authors.length}>
            {authors.map((author, index) => (
                <AuthorSmallItem key={index} author={author} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
};

export default AuthorCarouselList;