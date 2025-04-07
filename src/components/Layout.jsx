import React, { useState } from "react";
import { Sidebar } from "../components_admin/Sidebar";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

export const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  try {
    return (
      <div className="flex flex-col min-h-screen">
        <div className="flex flex-grow">
          {isSidebarOpen && <Sidebar />}
          <div className="flex flex-col w-full">
          <Navbar toggleSidebar={toggleSidebar} isSidebarOpen={isSidebarOpen} />
            <main className="flex-grow">{children}</main>
          </div>
        </div>
        <Footer />
      </div>
    );
  } catch (error) {
    console.log(error);
  }
};
