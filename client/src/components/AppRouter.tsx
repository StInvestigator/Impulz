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

const AppRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/library" element={<LibraryPage />} />
            <Route path="/hello" element={<HelloPage />} />
            <Route path="/category" element={<CategoryPage />} />

            <Route
                path="/author/:id"
                element={
                    <ProtectedRoute>
                        <AuthorProfilePage />
                    </ProtectedRoute>
                }
            />

            <Route
                path="/playlist/:id"
                element={
                    <ProtectedRoute>
                        <PlaylistItemPage />
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
