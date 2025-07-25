import {Routes, Route, Navigate} from "react-router-dom";
import MainPage from "../pages/MainPage.tsx";
import HelloPage from "../pages/HelloPage.tsx";
import LibraryPage from '../pages/LibraryPage.tsx';
import CategoryPage from '../pages/CategoryPage.tsx';

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