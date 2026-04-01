import { useApp } from "../context/AppContext";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";

export default function Navbar() {
  const { state, dispatch } = useApp();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const ref = useRef();

  const user = state.user;
  const userName = user?.name || "Guest";

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    dispatch({ type: "SET_TOKEN", payload: null });
    dispatch({ type: "SET_USER", payload: null });

    navigate("/login");
  };

  const getInitials = (name) => {
    if (!name) return "G";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : parts[0][0].toUpperCase();
  };

  return (
    <div className="flex justify-between items-center 
      bg-[#0a2540]/80 backdrop-blur-xl 
      border border-blue-500/20 
      p-4 rounded-lg relative overflow-visible">

      <h2 className="text-lg font-semibold glow-pill">
        👋 Welcome, {userName}
      </h2>

      {/* PROFILE */}
      <div className="relative" ref={ref}>
        <div
          onClick={() => setOpen(!open)}
          className="w-12 h-12 rounded-full flex items-center justify-center
            bg-gradient-to-r from-blue-500 to-cyan-400
            text-white font-semibold text-base
            cursor-pointer hover:scale-110 transition
            shadow-lg shadow-blue-500/30
            ring-2 ring-blue-500/20"
        >
          {getInitials(userName)}
        </div>
      </div>

      {/* 🔥 PORTAL DROPDOWN */}
      {open &&
        createPortal(
          <div className="fixed inset-0 z-[99999]">

            {/* BACKDROP */}
            <div
              className="absolute inset-0"
              onClick={() => setOpen(false)}
            />

            {/* DROPDOWN */}
            <div className="absolute top-20 right-6 w-64 
              bg-[#0a2540]/95 backdrop-blur-xl 
              border border-blue-500/20 
              rounded-2xl p-5 
              shadow-[0_20px_60px_rgba(0,0,0,0.7)] 
              animate-fadeIn">

              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full 
                  bg-gradient-to-r from-blue-500 to-cyan-400 
                  flex items-center justify-center text-white font-semibold">
                  {getInitials(userName)}
                </div>

                <div>
                  <p className="text-sm font-semibold">{user?.name}</p>
                  <p className="text-xs text-gray-400 truncate">
                    {user?.email}
                  </p>
                </div>
              </div>

              <div className="border-t border-blue-500/20 my-3" />

              <button
                onClick={handleLogout}
                className="w-full bg-red-500/80 text-white py-2 rounded-lg 
                  hover:bg-red-600 transition"
              >
                Logout
              </button>

            </div>
          </div>,
          document.getElementById("portal-root")
        )}
    </div>
  );
}