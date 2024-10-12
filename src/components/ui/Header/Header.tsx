
import React from "react";
import { NavLink, useLocation, } from "react-router-dom";
import { NavItem } from "./types";

// Массив пунктов меню
const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Weather", path: "/weather" },
];

const Header: React.FC = () => {
    // Текущее местоположение из URL
    const location = useLocation();

    // Активна ссылка или нет.
    const isActiveLink = (path: string): boolean => {
        return (
            location?.pathname === path ||
            (path === "/cards" && location?.pathname?.startsWith("/cards"))
        );
    };

    return (
        <header className="bg-white shadow fixed top-0 left-0 right-0 z-10">
            <div className="max-w-7xl mx-auto px-2">
                <div className="relative flex justify-between h-16">
                    <nav className="flex-1 flex items-center justify-center sm:items-stretch sm:justify-start">
                        <NavLink to="/" className="flex-shrink-0 flex items-center">
                            <img
                                className="w-36 object-contain"
                                src="../../../assets/header/logo.svg"
                                alt="Logo"
                            />
                        </NavLink>
                        <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
                            {navItems?.length > 0 && navItems.map((item) => {
                                return (
                                    <NavLink
                                        to={item?.path}
                                        key={item?.path}
                                        className={`text-zinc-800 inline-flex items-center px-1 pt-1 text-sm ${isActiveLink(item?.path)
                                            ? "text-indigo-500 border-b-2 border-indigo-500"
                                            : "hover:text-indigo-500"
                                            }`}
                                    >
                                        {item?.name}
                                        {item?.icon}
                                    </NavLink>
                                );
                            })}

                        </div>
                    </nav>
                    <div id="buttons-wrapper" className="inline-flex items-center">
                        <button
                            type="button"
                            className="border-2 text-indigo-500 border-indigo-500 font-medium py-2 px-4 rounded"
                        >
                            Login
                        </button>
                        <button
                            type="button"
                            className="ml-3 border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded"

                        >
                            Register
                        </button>
                    </div>
                </div>
            </div>
        </header>
    );
};

Header.displayName = 'Header';

export default Header;
