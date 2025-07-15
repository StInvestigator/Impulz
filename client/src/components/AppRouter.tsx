import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";
import MainPage from "../pages/MainPage";
import HelloPage from "../pages/HelloPage";

const pages = [
    {
        path: "/main",
        Component: MainPage,
    },
    {
        path: "/hello",
        Component: HelloPage,
    }
]

const AppRouter = () => {

    return (
        <Routes>
            {pages.map(({path, Component}) =>
                <Route key={path} path={path} Component={Component}/>
            )}
            <Route path="*" element={<Navigate to="/main" replace />} />
        </Routes>
    );
};

export default AppRouter;