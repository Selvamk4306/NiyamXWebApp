import ProjectCard from "../components/Projectcard";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useApp } from "../context/AppContext";

export default function Projects() {
  const { state, dispatch } = useApp();

  const [showForm, setShowForm] = useState(false);

  const [newProject, setNewProject] = useState({
    name: "",
    description: ""
  });

  // ✅ FETCH PROJECTS
  useEffect(() => {
    API.get("/api/projects")
      .then((res) => {
        dispatch({ type: "SET_PROJECTS", payload: res.data });
      })
      .catch(console.error);
  }, []);

  // ✅ CREATE PROJECT
  const handleCreate = async () => {
    if (!newProject.name) {
      alert("Project name required");
      return;
    }

    try {
      const res = await API.post("/api/projects", newProject);

      dispatch({
        type: "SET_PROJECTS",
        payload: [...state.projects, res.data],
      });

      setShowForm(false);
      setNewProject({ name: "", description: "" });

    } catch (err) {
      console.error(err);
      alert("Error creating project");
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/api/projects/${id}`);

      dispatch({
        type: "SET_PROJECTS",
        payload: state.projects.filter(p => p.id !== id)
      });

    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-[Poppins] glow-hover text-3xl font-bold tracking-tight cursor-pointer">
          Projects
        </h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 
            text-white px-4 py-2 rounded-lg 
            hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
        >
          + Add Project
        </button>
      </div>

      {/* 🔥 MODAL */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center 
          bg-black/50 backdrop-blur-md z-50">

          <div className="w-[380px] p-6 rounded-2xl 
            bg-white/5 backdrop-blur-xl 
            border border-blue-500/20 
            shadow-lg shadow-blue-500/10 animate-fadeIn">

            <h2 className="text-xl font-semibold mb-4 text-center">
              Create Project
            </h2>

            {/* INPUT */}
            <input
              value={newProject.name}
              placeholder="Project Name"
              className="w-full mb-3 p-3 rounded-lg 
                bg-white/10 border border-blue-500/20 
                text-white placeholder-gray-400 
                focus:border-blue-400 outline-none"
              onChange={(e) =>
                setNewProject({ ...newProject, name: e.target.value })
              }
            />

            {/* TEXTAREA */}
            <textarea
              value={newProject.description}
              placeholder="Description"
              className="w-full mb-4 p-3 rounded-lg 
                bg-white/10 border border-blue-500/20 
                text-white placeholder-gray-400 
                focus:border-blue-400 outline-none"
              onChange={(e) =>
                setNewProject({ ...newProject, description: e.target.value })
              }
            />

            {/* BUTTONS */}
            <div className="flex justify-between gap-3">

              <button
                onClick={handleCreate}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 
                  text-white py-2 rounded-lg 
                  hover:scale-105 hover:shadow-md hover:shadow-blue-500/30"
              >
                Save
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-white/10 py-2 rounded-lg 
                  hover:bg-white/20"
              >
                Cancel
              </button>

            </div>

          </div>
        </div>
      )}

      {/* 🔥 PROJECT LIST */}
      <div className="grid grid-cols-2 gap-6">
        {Array.isArray(state.projects) &&
          state.projects.map((p) => (
          <div key={p.id} className="animate-fadeIn">
            <ProjectCard project={p} onDelete={handleDelete}/>
          </div>
        ))}
      </div>
    </>
  );
}