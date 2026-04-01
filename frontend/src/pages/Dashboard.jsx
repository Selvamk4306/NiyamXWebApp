import StatCard from "../components/StatCard";
import { useApp } from "../context/AppContext";
import ProjectChart from "../components/ProjectChart";
import TaskChart from "../components/TaskChart";
import { useState } from "react";

export default function Dashboard() {
  const { state, dispatch } = useApp(); // ✅ FIXED

  const [showAll, setShowAll] = useState(false);

  const srotedProjects = [...state.projects];
  const visibleProjects = srotedProjects.slice(0, 5);

  const completedTasks = state.tasks.filter(t => t.status === "DONE").length;
  const inProgressTasks = state.tasks.filter(t => t.status === "IN_PROGRESS").length;

  const BASE_URL = "http://localhost:8080/api";
  const API = {
    get: (url) =>
    fetch(BASE_URL + url, {
      headers: {
        Authorization: "Bearer " + localStorage.getItem("token"),
      },
    }).then(async (res) => {
      if (!res.ok) {
        throw new Error("API Error: " + res.status);
      }
      return res.json();
    }),
  };

  return (
    <>
      <h1 className="font-[Poppins] glow-hover text-3xl font-bold mb-6 cursor-pointer">Dashboard</h1>

      <div className="grid grid-cols-4 gap-6 mb-6">
        <StatCard title="Total Projects" value={state.projects.length} />
        <StatCard title="Tasks" value={state.tasks.length} />
        <StatCard title="Completed" value={completedTasks} />
        <StatCard title="In Progress" value={inProgressTasks} />  
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="font-semibold">Project Progress</h2>
              <button
              onClick={() => setShowAll(true)}
              className="text-sm text-blue-500 hover:underline"
              >
                View All →
              </button>
          </div>

          <ProjectChart projects = {visibleProjects}/>
        </div>
        <TaskChart />
      </div>
      {showAll && (
        <div
          className="fixed inset-0 bg-black/60 flex justify-center items-center z-50"
          onClick={() => setShowAll(false)}
        >
          <div
            className="bg-slate-900 p-6 rounded-xl w-[500px] max-h-[500px] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}  // 👈 prevent inside click
          >
            <h2 className="text-lg font-semibold mb-4">All Projects</h2>

            {state.projects.map(p => (
              <div key={p.id} className="flex justify-between py-2 border-b border-gray-700">
                <span>{p.name}</span>
                <span>{p.progress || 0}%</span>
              </div>
            ))}

            <button
              onClick={() => setShowAll(false)}
              className="mt-4 bg-blue-500 px-4 py-2 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
}