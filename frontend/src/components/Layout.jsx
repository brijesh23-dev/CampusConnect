import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";
const Layout = () => {
  
  return (
    <div  className="flex flex-col h-[100vh] relative bg-gradient-to-b from-white to-blue-200">
      <Navbar />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
        <Footer  />
    </div>
  );
};

export default Layout;
