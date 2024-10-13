import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Weather from "../components/pages/Weather";
import Forbidden from "../components/pages/Forbidden";
import PrivateRoute from "../routes/PrivateRoute";
import { RouteItem } from "./types";
import Home from "../components/pages/Home";

// Массив роутов приложения
const routes: RouteItem[] = [
    { path: "/home", element: <PrivateRoute element={<Home />} /> },
    { path: "/weather", element: <PrivateRoute element={<Weather />} /> },
    { path: "/forbidden", element: <Forbidden /> }
];

// Рекурсивно отображает роуты и дочерние роуты.
const renderRoute = ({ path, element, children }: RouteItem) => (
    <Route key={path} path={path} element={element}>
        {children && children?.map(renderRoute)}
    </Route>
);

// Корневой компонент приложения с роутами
const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<MainLayout />}>
                {routes?.map(renderRoute)}
            </Route>
        </Routes>
    );
};

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
