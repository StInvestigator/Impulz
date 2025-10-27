import { Routes, Route, Navigate } from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import HelloPage from "../pages/HelloPage.tsx";
import LibraryPage from '../pages/LibraryPage.tsx';
import CategoryPage from '../pages/CategoryPage.tsx';
import AuthorProfilePage from "../pages/AuthorProfilePage.tsx";
import AlbumColaborationPlaylistPage from "../pages/AlbumColaborationPlaylistPage.tsx";
import AuthorPage from "../pages/AuthorPage.tsx";
import TopSelectionsPage from "../pages/TopSelectionsPage.tsx";
import PlaylistItemPage from "../pages/PlaylistItemPage.tsx";
import FavoriteTracksPage from "../pages/FavoriteTracksPage.tsx";
import UserProfilePage from "../pages/UserProfilePage.tsx";

import ProtectedRoute from "./ProtectedRoute.tsx";
import PopularTracksPage from "../pages/tracks_page/PopularTracksPage.tsx";
import AlbumsInAuthorPage from "../pages/album_page/AlbumsInAuthorPage.tsx";
import ColaborationInAuthorPage from "../pages/album_page/ColaborationInAuthorPage.tsx";
import SimilarAuthorsPage from "../pages/authors_page/SimilarAuthorsPage.tsx";
import AlbumItemPage from "../pages/AlbumItemPage.tsx";
import HitsWeekPage from "../pages/tracks_page/HitsWeekPage.tsx";
import BestAuthorsMonthPage from "../pages/authors_page/BestAuthorsMonthPage.tsx";
import BestPlaylistByWeekPage from "../pages/playlists_page/BesrPlaylistByWeekPage.tsx";
import OfficeArtistPage from "../pages/OfficeArtistPage.tsx";
import AlbumTodayRecommendationsPage from "../pages/album_page/AlbumTodayRecommendationsPage.tsx";
import AlbumPersonalRecommendationsPage from "../pages/album_page/AlbumPersonalRecommendationsPage.tsx";
import AlbumRecentInCategoryPage from "../pages/album_page/AlbumRecentInCategoryPage.tsx";
import BestTracksInGenrePage from "../pages/tracks_page/BestTracksInGenrePage.tsx";
import BestAuthorsInGenre from "../pages/authors_page/BestAuthorsInGenre.tsx";
import PlaylistsRecentCategoryPage from "../pages/playlists_page/PlaylistsRecentCategoryPage.tsx";
import SearchResultsPage from "../pages/search_page/SearchResultPage.tsx";
import { Suspense } from "react";
import SearchTracksPage from "../pages/tracks_page/SearchTracksPage.tsx";
import SearchPlaylistsPage from "../pages/playlists_page/SearchPlaylistsPage.tsx";
import SearchAlbumsPage from "../pages/album_page/SearchAlbumsPage.tsx";
import SearchAuthorsPage from "../pages/authors_page/SearchAuthorsPage.tsx";
import MyProfilePage from "../pages/MyProfilePage.tsx";
import SubscriptionsPage from "../pages/SubscriptionsPage.tsx";
import LikedPlaylistPage from "../pages/playlists_page/LikedPlaylistPage.tsx";
import NotFoundPage from "../pages/NotFoundPage.tsx";

const AppRouter = () => {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/library" element={<LibraryPage />} />
                <Route path="/hello" element={<HelloPage />} />
                <Route path="/category" element={<CategoryPage />} />
                <Route path="/hitsWeek" element={<HitsWeekPage />} />
                <Route path="/bestAuthorsMonth" element={<BestAuthorsMonthPage />} />
                <Route path="/bestPlaylistsWeek" element={<BestPlaylistByWeekPage />} />
                <Route path="/albumTodayRecommendations" element={<AlbumTodayRecommendationsPage />} />
                <Route path="/personalAlbumRecommendations" element={<AlbumPersonalRecommendationsPage />} />
                <Route path="/genre/:id/recent-albums" element={<AlbumRecentInCategoryPage />} />
                <Route path="/genre/:id/top-authors" element={<BestAuthorsInGenre />} />
                <Route path="/genre/:id/popular-tracks" element={<BestTracksInGenrePage />} />
                <Route path="/genre/:id/recent-playlists" element={<PlaylistsRecentCategoryPage />} />


                <Route element={<ProtectedRoute />}>
                    <Route path="/profile" element={<MyProfilePage />} />
                    <Route path="/user/:id" element={<UserProfilePage />} />
                    <Route path="/author/:id" element={<AuthorProfilePage />} />
                    <Route path="/album/:albumId" element={<AlbumItemPage />} />
                    <Route path="/playlist/:playlistId" element={<PlaylistItemPage />} />
                    <Route path={"/playlist/liked"} element={<LikedPlaylistPage/> }/>
                    <Route path="/search" element={<SearchResultsPage />} />
                    <Route path="/search/:query/authors" element={<SearchAuthorsPage />} />
                    <Route path="/search/:query/tracks" element={<SearchTracksPage />} />
                    <Route path="/search/:query/albums" element={<SearchAlbumsPage />} />
                    <Route path="/search/:query/playlists" element={<SearchPlaylistsPage />} />
                    <Route path="/officeArtist" element={<OfficeArtistPage />} />
                    <Route path="/subscriptions" element={<SubscriptionsPage />} />
                </Route>

              
                <Route path="/author/:id/popularTracks" element={<PopularTracksPage />} />
                <Route path="/author/:id/albums" element={<AlbumsInAuthorPage />} />
                <Route path="/author/:id/collaborations" element={<ColaborationInAuthorPage />} />
                <Route path="/author/:id/similarAuthors" element={<SimilarAuthorsPage />} />

                <Route path="/all" element={<AlbumColaborationPlaylistPage />} />
                <Route path="/allAuthors" element={<AuthorPage />} />
                <Route path="/allTopSelections" element={<TopSelectionsPage />} />
                <Route path="/favoriteTracks" element={<FavoriteTracksPage />} />

                <Route path="*" element={<Navigate to="/" replace />} />
                <Route path="/notFound" element={<NotFoundPage/> }/>
            </Routes>
        </Suspense>
    );
};

export default AppRouter;