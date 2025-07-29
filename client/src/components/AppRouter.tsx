import React, {PropsWithChildren, ReactElement, ReactNode} from 'react';
import { useKeycloak } from "@react-keycloak/web";
import {Routes, Route, Navigate} from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import HelloPage from "../pages/HelloPage.tsx";
import LibraryPage from '../pages/LibraryPage.tsx';
import CategoryPage from '../pages/CategoryPage.tsx';
import AuthorPage from "../pages/AuthorPage.tsx";


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
        path: "/allAuthors",
        Component: AuthorPage,
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