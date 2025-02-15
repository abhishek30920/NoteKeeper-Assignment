import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import useThemeStore from "../../store/theme";

const Layout = () => {
  const { theme } = useThemeStore();
  
  return (
    <div className={`flex flex-col min-h-screen 
        ${theme === 'dark' 
          ? 'bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 text-white shadow-2xl shadow-gray-900/50' 
          : 'bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 text-gray-800 shadow-xl shadow-blue-100/50'
        }
        transition-all duration-300 ease-in-out
      `}
    >
      <Header />
      {/* Main content takes full height and allows scrolling */}
      <main className="flex-grow overflow-auto p-4 mt-[70px]">  
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
