import { useLocation, useSearchParams } from 'react-router-dom';
import { Box } from "@mui/material";
import categoryTop from '../assets/category/categoryTop.svg';
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux.ts';
import { fetchTopAuthorsInGenre } from '../store/reducers/action-creators/author.ts';
import { fetchRecentAlbumsByGenre } from '../store/reducers/action-creators/album.ts';
import { fetchPopularTracksByGenre } from '../store/reducers/action-creators/tracks.ts';
import { fetchRecentPlaylistsByGenre } from '../store/reducers/action-creators/playlist.ts';
import MediaSmallCarouselList from "../components/carousel_list/MediaSmallCarouselList.tsx";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList.tsx";
import { useTranslation } from 'react-i18next';
import TrackSmallCarouselList from '../components/carousel_list/TrackSmallCarouselList.tsx';


const CategoryPage = () => {
    const dispatch = useAppDispatch();
    const { topAuthorsInGenre, isLoading: authorsLoading, error: authorsError } = useAppSelector(state => state.author);
    const { recentAlbumsByGenre, isLoading: albumLoading, error: albumError } = useAppSelector(state => state.album);
    const { popularTracksByGenre, isLoading: tracksLoading, error: tracksError } = useAppSelector(state => state.track);
    const { recentPlaylistsByGenre, isLoading: playlistsLoading, error: playlistsError } = useAppSelector(state => state.playlist);

    const location = useLocation();
    const { t } = useTranslation('category');
    const { i18n } = useTranslation();
    const [searchParams] = useSearchParams();
    const category = (location.state as any)?.category || searchParams.get('category');
    const categoryUa = (location.state as any)?.categoryUa || searchParams.get('categoryUa');
    const genreId = (location.state as any)?.genreId || Number(searchParams.get('genreId')) || 1;
    const isUkrainian = i18n.language?.toLowerCase().startsWith('uk');

    useEffect(() => {
        if (!genreId) return;
        dispatch(fetchTopAuthorsInGenre({ genreId, page: 0, size: 20 }));
        dispatch(fetchRecentAlbumsByGenre({ genreId, page: 0, size: 20 }));
        dispatch(fetchPopularTracksByGenre({ genreId, page: 0, size: 20 }));
        dispatch(fetchRecentPlaylistsByGenre({ genreId, page: 0, size: 20 }));
    }, [dispatch, genreId]);

    return (
        <>
            <Box sx={{
                backgroundImage: `url(${categoryTop})`,
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
                    borderRadius="10px"
                    maxWidth={584}
                    maxHeight={132}
                    padding={1.5}
                    fontSize={48}
                    fontWeight={700}
                >
                    {isUkrainian ? categoryUa : category}
                </Box>
            </Box>

            {topAuthorsInGenre && topAuthorsInGenre.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <AuthorCarouselList
                        authors={topAuthorsInGenre}
                        itemWidth={134}
                        name={t("title-best-author-genre")}
                        isLoading={authorsLoading}
                        error={authorsError}
                        url={"/genre/" + genreId + "/top-authors"}
                        color='light'
                    />
                </Box>)}


            {popularTracksByGenre && popularTracksByGenre.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <TrackSmallCarouselList
                        tracks={popularTracksByGenre}
                        isLoading={tracksLoading}
                        error={tracksError}
                        itemWidth={134}
                        title={t("title-best-song-genre")}
                        variant="h3"
                        url={"/genre/" + genreId + "/popular-tracks"}
                    />
                </Box>)}


            {recentAlbumsByGenre && recentAlbumsByGenre.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <MediaSmallCarouselList
                        medias={recentAlbumsByGenre}
                        itemWidth={134}
                        name={t("title-recent-albums")}
                        isLoading={albumLoading}
                        error={albumError}
                        url={"/genre/" + genreId + "/recent-albums"}
                    />
                </Box>)}


            {recentPlaylistsByGenre && recentPlaylistsByGenre.length > 0 && (
                <Box component={"section"} mt={"60px"}>
                    <MediaSmallCarouselList
                        medias={recentPlaylistsByGenre}
                        itemWidth={134}
                        name={t("title-recent-playlists")}
                        isLoading={playlistsLoading}
                        error={playlistsError}
                        url={"/genre/" + genreId + "/recent-playlists"}
                    />
                </Box>)}


        </>
    );
};

export default CategoryPage;