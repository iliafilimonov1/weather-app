import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { generateTokens } from '../utils/generateTokens';

// Типы для данных пользователя
interface User {
    id?: string;
    login: string;
    password: string;
}

// Тип для контекста аутентификации
interface AuthContextType {
    user: User | null;
    /* Загрузка данных */
    isLoading: boolean;
    /* Регистрация пользователя */
    onRegister: (userData: User) => Promise<void>;
    /* Вход пользователя */
    onLogin: (userData: User) => Promise<void>;
    /* Выход пользователя */
    onLogout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    // Данные об аутентификации пользователя
    const [user, setUser] = useState<User | null>(null);

    // Состояние загрузки
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const authDataFromLocalStorage = localStorage?.getItem("authData");

        if (authDataFromLocalStorage) {
            const authData = JSON?.parse(authDataFromLocalStorage);
            // Устанавливаем пользователя из authData
            setUser(authData?.user);
        }
        setIsLoading(false);
    }, []);

    // Регистрация пользователя
    const onRegister = async (userData: User) => {
        try {
            const createResponse = await fetch("http://localhost:3000/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (!createResponse.ok) {
                throw new Error("Ошибка регистрации пользователя");
            }

            const createdUser = await createResponse?.json();

            // Генерация токенов
            const tokens = generateTokens(createdUser.id, createdUser.login);

            // Сохранение информации о пользователе и токенах
            const authData = {
                user: createdUser,
                ...tokens,
            };

            localStorage?.setItem("authData", JSON?.stringify(authData));
            setUser(createdUser);
        } catch (error) {
            console.error("Ошибка при регистрации пользователя:", error);
        }
    };

    // Вход пользователя
    const onLogin = async (userData: User) => {
        try {
            const { login, password } = userData;

            const response = await fetch(`http://localhost:3000/users?login=${encodeURIComponent(login)}`);

            if (!response.ok) {
                throw new Error("Ошибка при запросе на сервер");
            }

            const users = await response.json();

            if (users?.length === 1 && users[0]?.password === password) {
                const user = users[0];

                if (user && user?.id) {
                    const tokens = generateTokens(user?.id, user?.login);

                    // Сохранение информации о пользователе и токенах
                    const authData = {
                        user,
                        ...tokens,
                    };

                    localStorage?.setItem("authData", JSON?.stringify(authData));
                    setUser(user);
                } else {
                    console.error("User ID is missing.");
                }
            } else {
                console.error("Неверное имя пользователя или пароль");
            }
        } catch (error) {
            console.error("Ошибка при входе пользователя:", error);
        }
    };

    // Выход пользователя
    const onLogout = () => {
        setUser(null);
        localStorage?.removeItem("authData");
    };

    const contextValue = { user, isLoading, onRegister, onLogin, onLogout };

    return <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>;
};

// Хук для доступа к контексту аутентификации
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within AuthProvider");
    }

    return context;
};