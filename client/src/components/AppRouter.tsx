import {Routes, Route, Navigate} from "react-router-dom";
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

const pages = [
    {
        path: "/",
        Component: MainPage,
    },
    {
        path: "/library",
        Component: LibraryPage,
    },
    {
        path: "/hello",
        Component: HelloPage,
    },
    {
        path: "/category",
        Component: CategoryPage,
    },
    {
        path: "/author/:name",
        Component: AuthorProfilePage,
    },
    {
        path: "/user/:name",
        Component: UserProfilePage,
    },
    {
        path: "/all",
        Component: AlbumColaborationPlaylistPage,
    },
    {
        path: "/allAuthors",
        Component: AuthorPage,
    },
    {
        path: "/allTopSelections",
        Component: TopSelectionsPage,
    },
    {
        path: "/playlist/:name",
        Component: PlaylistItemPage,
    },
    {
        path: "/favoriteTracks",
        Component: FavoriteTracksPage,
    }
]

const AppRouter = () => {

    return (
        <Routes>
            {pages.map(({path, Component}) =>
                <Route key={path} path={path} Component={Component}/>
            )}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;