import React from "react";
import { FaBars, FaTimes } from "react-icons/fa";

const Navbar = ({ toggleSidebar, isSidebarOpen }) => {
  return (
    <div className="flex items-center justify-between px-10 py-5 bg-white">
      <div className="flex items-center space-x-10">
        <button
          className="text-[#016A70] text-2xl hover:text-green-800 transition-colors duration-200"
          onClick={toggleSidebar}
        >
          {isSidebarOpen ? <FaTimes /> : <FaBars />}
        </button>
        <div>
        <h1 className="font-semibold text-2xl text-gray-800">Profil</h1>
        <p className="text-sm text-gray-500">
            <span className="text-green-600 font-medium">
              {new Date().toLocaleDateString("id-ID", { weekday: "long" })}
            </span>{" "}
            / {String(new Date().getDate()).padStart(2, "0")} /{" "}
            <span>
              {new Date()
                .toLocaleDateString("id-ID", {
                  month: "long",
                })
                .toLowerCase()}
            </span>{" "}
            / {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
