import { useSearchParams } from 'react-router-dom';
import { Box } from "@mui/material";
import CircleImg from '../assets/category/Circle.svg'
import MediaSmallCarouselList from "../components/carousel_list/MediaSmallCarouselList.tsx";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";
import { useTranslation } from 'react-i18next';
import type {AuthorSimpleDto} from "../models/DTO/AuthorSimpleDto.ts";

const tracks = [
    'Трек 1', 'Трек 2', 'Трек 3',
    'Трек 4', 'Трек 5', 'Трек 6',
    'Трек 7', 'Трек 8', 'Трек 9', 'Трек 10', 'Трек 11',
    'Трек 12', 'Трек 13', 'Трек 14',
    'Трек 15', 'Трек 16'
];

const authors: AuthorSimpleDto[] = [
    {
        id: 1,
        name: 'Автор 1',
        imgUrl: 'https://via.placeholder.com/150x150?text=Author+1'
    },
    {
        id: 2,
        name: 'Автор 2',
        imgUrl: 'https://via.placeholder.com/150x150?text=Author+2'
    },
    {
        id: 3,
        name: 'Автор 3',
        imgUrl: 'https://via.placeholder.com/150x150?text=Author+3'
    },
    {
        id: 4,
        name: 'Автор 4',
        imgUrl: 'https://via.placeholder.com/150x150?text=Author+4'
    },
    {
        id: 5,
        name: 'Автор 5',
        imgUrl: 'https://via.placeholder.com/150x150?text=Author+5'
    },
];

const CategoryPage = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    const { t } = useTranslation('category')
    return (
        <>
            <Box
                bgcolor="gray"
                borderRadius="10px"
                height={400}
                width="100%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                position="relative"
            >
                <Box component="img" src={CircleImg} draggable={"false"}/>
                <Box
                    position="absolute"
                    bottom={0}
                    left={0}
                    bgcolor="rgba(255, 255, 255, 0.50)"
                    borderRadius="10px"
                    maxWidth={584}
                    maxHeight={132}
                    padding={1.5}
                    fontSize={48}
                    fontWeight={700}
                >
                    {category}
                </Box>
            </Box>

            <Box component={"section"} mt={"60px"}>
                <AuthorCarouselList authors={authors} itemWidth={134} name={t("title-best-author-genre")} />
            </Box>

            <Box component={"section"} mt={"60px"}>
                <MediaSmallCarouselList tracks={tracks} itemWidth={134} name={t("title-best-song-genre")} />
            </Box>

            <Box component={"section"} mt={"60px"}>
                <MediaSmallCarouselList tracks={tracks} itemWidth={134} name={t("title-new-release")} />
            </Box>
        </>
    );
};

export default CategoryPage;