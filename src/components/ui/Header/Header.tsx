
import React from "react";
import { NavLink, useLocation, } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import SignIn from "../../auth/SignIn";
import SignUp from "../../auth/SignUp";
import useDisclosure from "../../../hooks/useDisclosure";
import { NavItem } from "./types";

// Пункты меню
const navItems: NavItem[] = [
    { name: "Home", path: "/" },
    { name: "Weather", path: "/weather" },
];

const Header: React.FC = () => {
    // Кастомный хук для проверки данных пользователя, выхода
    const { user, onLogout } = useAuth();

    // Модалка для входа
    const signIn = useDisclosure();

    // Модалка для регистрации
    const signUp = useDisclosure();

    // Текущее местоположение из URL
    const location = useLocation();

    // Активна ссылка или нет.
    const isActiveLink = (path: string): boolean => {
        return (
            location?.pathname === path ||
            (path === "/weather" && location?.pathname?.startsWith("/weather"))
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
                            {user && navItems?.length > 0 && navItems?.map((item) => (
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
                            ))}

                        </div>
                    </nav>
                    <div id="buttons-wrapper" className="inline-flex items-center">
                        {!user ? (
                            <>
                                <button
                                    type="button"
                                    className="border-2 text-indigo-500 border-indigo-500 font-medium py-2 px-4 rounded"
                                    onClick={signIn?.onOpen}
                                >
                                    Login
                                </button>
                                <button
                                    type="button"
                                    onClick={signUp?.onOpen}
                                    className="ml-3 border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded"

                                >
                                    Register
                                </button>
                            </>
                        ) : (
                            <button
                                type="button"
                                className="ml-3 border-2 border-indigo-500 bg-indigo-500 text-white font-medium py-2 px-4 rounded"
                                onClick={onLogout}
                            >
                                Logout
                            </button>
                        )}

                    </div>
                </div>
            </div>

            <SignIn isOpen={signIn.isOpen} onClose={signIn.onClose} />
            <SignUp isOpen={signUp?.isOpen} onClose={signUp?.onClose} />
        </header>
    );
};

Header.displayName = 'Header';

export default Header;
