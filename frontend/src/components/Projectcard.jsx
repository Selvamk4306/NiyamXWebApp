export default function ProjectCard({ project, onDelete }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl p-6 rounded-2xl 
      border border-blue-500/20 shadow-lg shadow-blue-500/10 
      hover:shadow-blue-500/30 hover:-translate-y-1 slide-up">

      {/* 🔥 TITLE */}
      <h3 className="text-lg font-bold inline-block px-3 py-1 rounded-lg 
                     bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow-md">
        {project.name}
      </h3>

      {/* 🔥 DESCRIPTION */}
      <p className="text-sm text-gray-300 mt-3 leading-relaxed">
        {project.description || "No description provided"}
      </p>

      {/* 🔥 FOOTER */}
      <div className="flex justify-between items-center mt-5">

        {/* STATUS TAG */}
        <span className="text-xs px-3 py-1 rounded-full bg-blue-500/20 text-blue-300 text-white">
          Active Project
        </span>

        {/* DELETE */}
        <button
          onClick={() => onDelete(project.id)}
          className="bg-red-500 px-3 py-1 rounded-lg text-sm hover:bg-red-600 transition"
        >
          Delete
        </button>

      </div>
    </div>
  );
}