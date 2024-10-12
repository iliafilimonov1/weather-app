import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../components/pages/Home";
import Weather from "../components/pages/Weather";
import { RouteItem } from "./types";


// Массив роутов приложения
const routes: RouteItem[] = [
    { path: "/", element: <Home /> },
    { path: "weather", element: <Weather /> }
];

// Рекурсивно отображает роуты и дочерние роуты.
const renderRoute = ({ path, element, children }: RouteItem) => (
    <Route key={path} path={path} element={element}>
        {children && children?.map(renderRoute)}
    </Route>
);

// Корневой компонент приложения с роутами
const AppRoutes = () => (
    <Routes>
        <Route path="/" element={<MainLayout />}>
            {routes?.map(renderRoute)}
        </Route>
    </Routes>
);

AppRoutes.displayName = 'AppRoutes';

export default AppRoutes;
