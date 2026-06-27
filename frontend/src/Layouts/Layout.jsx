import React from "react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/common/Footer";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/common/Sidebar";

const Layout = () => {
  return (
    <div className="flex min-h-screen bg-gradient-to-b from-white to-blue-200">
      <Sidebar />

      <div className="flex min-h-screen flex-1 flex-col">
        <Navbar />

        <main className="flex-1 p-4">
          <Outlet />
        </main>

        <Footer />
      </div>
    </div>
  );
};

export default Layout;
