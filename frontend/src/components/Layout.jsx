import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import { useState } from "react";
import { useApp } from "../context/AppContext";

export default function Layout() {
  const [isOpen, setIsOpen] = useState(true);
  const { state } = useApp();

  return (
    <div className={`flex min-h-screen 
      ${state.theme === "dark"
        ? "text-white"
        : "bg-gray-100 text-black"
      }`}>
      
      <Sidebar 
        isOpen={isOpen} 
        toggleSidebar={() => setIsOpen(!isOpen)} 
      />

      <div className="flex-1 flex flex-col">
        <Navbar />

        <div className="p-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
}