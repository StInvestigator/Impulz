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

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/hello" element={<HelloPage />} />
            <Route path="/category" element={<CategoryPage />} />
            <Route path="/hitsWeek" element={<HitsWeekPage />} />
            <Route path="/bestAuthorsMonth" element={<BestAuthorsMonthPage />} />
            <Route path="/bestPlaylistsWeek" element={<BestPlaylistByWeekPage />} />

            <Route
                path="/author/:id"
                element={
                    <ProtectedRoute>
                        <AuthorProfilePage />
                    </ProtectedRoute>
                }
            />
            <Route path="/author/:id/popularTracks" element={<PopularTracksPage />} />
            <Route path="/author/:id/albums" element={<AlbumsInAuthorPage />} />
            <Route path="/author/:id/colaborations" element={<ColaborationInAuthorPage />} />
            <Route path="/author/:id/similarAuthors" element={<SimilarAuthorsPage />} />


            <Route
                path="/playlist/:playlistId"
                element={
                    <ProtectedRoute>
                        <PlaylistItemPage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/album/:albumId"
                element={
                    <ProtectedRoute>
                        <AlbumItemPage />
                    </ProtectedRoute>
                }
            />

            <Route path="/user/:name" element={<UserProfilePage />} />
            <Route path="/all" element={<AlbumColaborationPlaylistPage />} />
            <Route path="/allAuthors" element={<AuthorPage />} />
            <Route path="/allTopSelections" element={<TopSelectionsPage />} />
            <Route path="/favoriteTracks" element={<FavoriteTracksPage />} />

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;
