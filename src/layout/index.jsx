import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import SidebarLeft from "../components/SidebarLeft";

const Layout = () => {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main className="container">
        <div>
          <div className="flex mt-5 mb-5 w-full gap-5">
            <SidebarLeft />
            <div className="w-[1px] h-screen bg-gray-300">.</div>
            <Outlet />
          </div>
        </div>
      </main>
    </>
  );
};

export default Layout;
