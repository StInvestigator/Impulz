import ListCarousel from "../ListCarousel.tsx";
import AuthorSmallItem from "../items/author/AuthorSmallItem.tsx";
import {type FC} from "react";

interface AuthorListProps {
    authors: string[];
    itemWidth: number;
    name: string;
}

const AuthorCarouselList: FC<AuthorListProps> = ({authors, itemWidth, name}) => {
    return (
        <ListCarousel title={name} gap={24} variant={"h3"} count_items={authors.length}>
            {authors.map((author, index) => (
                <AuthorSmallItem key={index} author={author} itemWidth={itemWidth} />
            ))}
        </ListCarousel>
    );
}

export default AuthorCarouselList;