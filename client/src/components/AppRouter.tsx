
import {Routes, Route, Navigate} from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import HelloPage from "../pages/HelloPage.tsx";
import LibraryPage from '../pages/LibraryPage.tsx';
import CategoryPage from '../pages/CategoryPage.tsx';
import ProfilePage from "../pages/ProfilePage.tsx";
import AlbumColaborationPlaylistPage from "../pages/AlbumColaborationPlaylistPage.tsx";
import AuthorPage from "../pages/AuthorPage.tsx";
import TopSelectionsPage from "../pages/TopSelectionsPage.tsx";
import React, {PropsWithChildren, ReactElement, ReactNode} from 'react';
import { useKeycloak } from "@react-keycloak/web";


const AdminGuard = ({ children } : PropsWithChildren) : ReactElement => {
    const { keycloak } = useKeycloak();

    if (!keycloak.hasRealmRole('admin')) {
        return (
            <div style={{ padding: 20 }}>
                <h3>Доступ запрещён</h3>
                <p>Требуется роль администратора</p>
            </div>
        );
    }

    return <>{children}</>;
};

const routes = [
    {
        path: "/",
        element: <MainPage />,
        isAdmin: false
    },
    {
        path: "/hello",
        element: <HelloPage />,
        isAdmin: false
    },
    {
        path: "/library",
        element: <LibraryPage />,
        isAdmin: false
    },
    {
        path: "/category",
        Component: CategoryPage,
    },
    {
        path: "/author/:name",
        Component: ProfilePage,
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
    }
];

const AppRouter = () => {
    return (
        <Routes>
            {routes.map((route) => {
                let element = route.element;

                if (route.isAdmin) {
                    element = <AdminGuard>{route.element}</AdminGuard>;
                }

                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={element}
                    />
                );
            })}

            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    );
};

export default AppRouter;