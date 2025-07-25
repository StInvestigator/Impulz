import { useSearchParams } from 'react-router-dom';
import { Box } from "@mui/material";
import CircleImg from '../assets/category/Circle.svg'
import TrackSmallCarouselList from "../components/carousel_list/TrackSmallCarouselList";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";

const tracks = [
    'Трек 1', 'Трек 2', 'Трек 3',
    'Трек 4', 'Трек 5', 'Трек 6',
    'Трек 7', 'Трек 8', 'Трек 9', 'Трек 10', 'Трек 11',
    'Трек 12', 'Трек 13', 'Трек 14',
    'Трек 15', 'Трек 16'
];

const authors = [
    'Автор 1', 'Автор 2', 'Автор 3',
    'Автор 4', 'Автор 5', 'Автор 6',
    'Автор 7', 'Автор 8', 'Автор 9', 'Автор 10', 'Автор 11',
    'Автор 12', 'Автор 13', 'Автор 14',
    'Автор 15', 'Автор 16'
];

// const playlist = [
//     'Плейлист 1', 'Плейлист 2', 'Плейлист 3',
//     'Плейлист 4', 'Плейлист 5', 'Плейлист 6',
//     'Плейлист 7', 'Плейлист 8', 'Плейлист 9', 'Плейлист 10', 'Плейлист 11',
//     'Плейлист 12', 'Плейлист 13', 'Плейлист 14',
//     'Плейлист 15', 'Плейлист 16'
// ];

const CategoryPage = () => {
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
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
                <Box component="img" src={CircleImg} />
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
                <AuthorCarouselList authors={authors} itemWidth={134} name='Найкращі виконавці цього жанру' />
            </Box>

            <Box component={"section"} mt={"60px"}>
                <TrackSmallCarouselList tracks={tracks} itemWidth={134} name='Найкращі пісні жанру' />
            </Box>

            <Box component={"section"} mt={"60px"}>
                <TrackSmallCarouselList tracks={tracks} itemWidth={134} name='Нові релізи' />
            </Box>
        </>
    );
};

export default CategoryPage;