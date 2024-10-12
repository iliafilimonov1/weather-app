import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/ui/Header";
import Footer from "../components/ui/Footer";

const MainLayout: React.FC = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <Header />
            <main className="flex-grow container mx-auto p-4 mt-16">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

MainLayout.displayName = 'MainLayout';

export default MainLayout;
