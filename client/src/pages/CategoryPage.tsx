import { useSearchParams } from 'react-router-dom';
import { Box } from "@mui/material";
import categoryTop from '../assets/category/categoryTop.svg';
// import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";
// import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useAppDispatch } from '../hooks/redux.ts';
import { fetchTopAuthorsInGenre } from '../store/reducers/action-creators/author.ts';
// import { useAuthorsByKey } from '../hooks/modelByKey.ts';


const CategoryPage = () => {
    const dispatch = useAppDispatch();
    //const { topAuthors, isLoading: isLoadingTopAuthors, error: errorTopAuthors } = useAppSelector(state => state.author);

    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');
    //const { t } = useTranslation('category')

    useEffect(() => {
        dispatch(fetchTopAuthorsInGenre({ genreId: 1 }));
    }, [dispatch]);

    return (
        <>
            <Box sx={{
                backgroundImage:  `url(${categoryTop})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: 'cover'
            }}
                borderRadius="10px"
                height={400}
                width="100%"
                display="flex"
                justifyContent="flex-end"
                alignItems="center"
                position="relative"
            >
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

            {/* <Box component={"section"} mt={"60px"}>
                <AuthorCarouselList isLoading={isLoadingTopAuthors} error={errorTopAuthors} authors={topAuthors} itemWidth={134} name={t("title-best-author-genre")} />
            </Box> */}

            {/*<Box component={"section"} mt={"60px"}>*/}
            {/*    <MediaSmallCarouselList medias={tracks} itemWidth={134} name={t("title-best-song-genre")} />*/}
            {/*</Box>*/}

            {/*<Box component={"section"} mt={"60px"}>*/}
            {/*    <MediaSmallCarouselList tracks={tracks} itemWidth={134} name={t("title-new-release")} />*/}
            {/*</Box>*/}
        </>
    );
};

export default CategoryPage;