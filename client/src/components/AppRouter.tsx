import React, {PropsWithChildren, ReactElement, ReactNode} from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { useKeycloak } from "@react-keycloak/web";
import MainPage from "../pages/MainPage";
import HelloPage from "../pages/HelloPage";
import LibraryPage from '../pages/LibraryPage';
import CategoryPage from '../pages/CategoryPage';


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
        element: <CategoryPage />,
        isAdmin: false
    },
    {
        path: "/subscriptions",
        element: <LibraryPage/>,
        isAdmin: true
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