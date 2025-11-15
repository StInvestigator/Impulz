import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Skeleton } from "@mui/material";
import categoryTop from '../assets/category/categoryTop.svg';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchTopAuthorsInGenre } from '../store/reducers/action-creators/author';
import { fetchRecentAlbumsByGenre } from '../store/reducers/action-creators/album';
import { fetchPopularTracksByGenre } from '../store/reducers/action-creators/tracks';
import { fetchRecentPlaylistsByGenre } from '../store/reducers/action-creators/playlist';
import MediaSmallCarouselList from "../components/carousel_list/MediaSmallCarouselList";
import AuthorCarouselList from "../components/carousel_list/AuthorCarouselList";
import TrackSmallCarouselList from '../components/carousel_list/TrackSmallCarouselList';
import { fetchGenre } from '../store/reducers/action-creators/genre';
import { useTranslation } from 'react-i18next';
import { setCurrentPage } from '../store/reducers/PageSlice';

const SectionSkeleton = ({ height = 180 }: { height?: number }) => (
  <Box component="section" mt="60px">
    <Skeleton variant="rectangular" width="100%" height={height} sx={{ borderRadius: 2 }} />
  </Box>
);

const CategoryPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const params = useParams<{ id?: string }>();
  const genreId = Number(params.id);
  const { t, i18n } = useTranslation('category');
  const isUkrainian = i18n.language?.toLowerCase().startsWith('uk');

  const { currentGenre, error: genresError } = useAppSelector(state => state.genre);
  const { topAuthorsInGenre, isLoading: authorsLoading, error: authorsError } = useAppSelector(state => state.author);
  const { recentAlbumsByGenre, isLoading: albumLoading, error: albumError } = useAppSelector(state => state.album);
  const { popularTracksByGenre, isFetchByGenreLoading: tracksLoading, error: tracksError } = useAppSelector(state => state.track);
  const { recentPlaylistsByGenre, isLoading: playlistsLoading, error: playlistsError } = useAppSelector(state => state.playlist);

  useEffect(() => {
    if (!genreId) return;
    dispatch(setCurrentPage(1))
    dispatch(fetchGenre(genreId));
    dispatch(fetchTopAuthorsInGenre({ genreId, page: 0, size: 20 }));
    dispatch(fetchRecentAlbumsByGenre({ genreId, page: 0, size: 20 }));
    dispatch(fetchPopularTracksByGenre({ genreId, page: 0, size: 20 }));
    dispatch(fetchRecentPlaylistsByGenre({ genreId, page: 0, size: 20 }));
  }, [dispatch, genreId]);


  const shouldShowHeaderSkeleton = authorsLoading && (!topAuthorsInGenre || topAuthorsInGenre.length === 0);

  return (
    <>
      {shouldShowHeaderSkeleton || genresError ? (
        <Skeleton variant="rectangular" width="100%" height={285} sx={{ borderRadius: "10px" }} />
      ) : (
        <Box
          sx={{
            backgroundImage: `url(${categoryTop})`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
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
            {isUkrainian ? currentGenre?.uaName : currentGenre?.name}
          </Box>
        </Box>
      )}

      {/* Top authors: skeleton only if empty AND loading */}
      {(authorsLoading && (!topAuthorsInGenre || topAuthorsInGenre.length === 0)) ? (
        <SectionSkeleton />
      ) : (
        topAuthorsInGenre && topAuthorsInGenre.length > 0 && (
          <Box component={"section"} mt={"60px"}>
            <AuthorCarouselList
              authors={topAuthorsInGenre}
              itemWidth={134}
              name={t("title-best-author-genre")}
              isLoading={authorsLoading}
              error={authorsError}
              url={`/genre/${genreId}/top-authors`}
              color='light'
            />
          </Box>
        )
      )}

      {/* Popular tracks */}
      {(tracksLoading && (!popularTracksByGenre || popularTracksByGenre.length === 0)) ? (
        <SectionSkeleton />
      ) : (
        popularTracksByGenre && popularTracksByGenre.length > 0 && (
          <Box component={"section"} mt={"60px"}>
            <TrackSmallCarouselList
              tracks={popularTracksByGenre}
              isLoading={tracksLoading}
              error={tracksError}
              itemWidth={134}
              title={t("title-best-song-genre")}
              variant="h3"
              url={`/genre/${genreId}/popular-tracks`}
            />
          </Box>
        )
      )}

      {/* Recent albums */}
      {(albumLoading && (!recentAlbumsByGenre || recentAlbumsByGenre.length === 0)) ? (
        <SectionSkeleton />
      ) : (
        recentAlbumsByGenre && recentAlbumsByGenre.length > 0 && (
          <Box component={"section"} mt={"60px"}>
            <MediaSmallCarouselList
              medias={recentAlbumsByGenre}
              itemWidth={134}
              name={t("title-recent-albums")}
              isLoading={albumLoading}
              error={albumError}
              url={`/genre/${genreId}/recent-albums`}
            />
          </Box>
        )
      )}

      {/* Recent playlists */}
      {(playlistsLoading && (!recentPlaylistsByGenre || recentPlaylistsByGenre.length === 0)) ? (
        <SectionSkeleton />
      ) : (
        recentPlaylistsByGenre && recentPlaylistsByGenre.length > 0 && (
          <Box component={"section"} mt={"60px"}>
            <MediaSmallCarouselList
              medias={recentPlaylistsByGenre}
              itemWidth={134}
              name={t("title-recent-playlists")}
              isLoading={playlistsLoading}
              error={playlistsError}
              url={`/genre/${genreId}/recent-playlists`}
            />
          </Box>
        )
      )}
    </>
  );
};

export default CategoryPage;
