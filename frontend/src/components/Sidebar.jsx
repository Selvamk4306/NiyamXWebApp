import { NavLink } from "react-router-dom";

export default function Sidebar({ isOpen, toggleSidebar }) {
  return (
    <div
      className={`${
        isOpen ? "w-64" : "w-20"
      } bg-[#020617] border-r border-blue-500/20 p-6 transition-all duration-300`}
    >
      {/* TOP HEADER */}
      <div className="flex items-center justify-between mb-8">
        <h2 className={`text-xl font-bold ${!isOpen && "hidden"}`}>
          My Workspace
        </h2>

        {/* ☰ BUTTON HERE */}
        <button
          onClick={toggleSidebar}
          className="text-xl hover:scale-110 transition"
        >
          ☰
        </button>
      </div>

      <nav className="flex flex-col gap-4">
        <NavLink
          to="/dashboard"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-all duration-200
            hover:bg-blue-500/10 hover:scale-[1.03]
            ${isActive ? "bg-blue-500/20 text-blue-300 shadow-md shadow-blue-500/20" : "text-gray-300"}`
          }
        >
          🏠 {isOpen && "Dashboard"}
        </NavLink>

        <NavLink
          to="/projects"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-all duration-200
            hover:bg-blue-500/10 hover:scale-[1.03]
            ${isActive ? "bg-blue-500/20 text-blue-300 shadow-md shadow-blue-500/20" : "text-gray-300"}`
          }
        >
          📁 {isOpen && "Projects"}
        </NavLink>

        <NavLink
          to="/tasks"
          className={({ isActive }) =>
            `flex items-center gap-3 p-2 rounded-lg transition-all duration-200
            hover:bg-blue-500/10 hover:scale-[1.03]
            ${isActive ? "bg-blue-500/20 text-blue-300 shadow-md shadow-blue-500/20" : "text-gray-300"}`
          }
        >
          ✅ {isOpen && "Tasks"}
        </NavLink>
      </nav>
    </div>
  );
}