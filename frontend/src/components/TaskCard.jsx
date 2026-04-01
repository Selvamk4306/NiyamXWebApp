export default function TaskCard({ task, onDelete }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl 
      border border-blue-500/20 
      shadow-md shadow-blue-500/10 
      rounded-xl p-4
      hover:-translate-y-1 hover:scale-[1.02]
      transition duration-300
      flex flex-col justify-between h-[140px] slide-up">

      {/* 🔥 TOP SECTION */}
      <div>

        {/* TITLE */}
        <h3 className="text-sm font-semibold px-2 py-1 rounded-md inline-block
          bg-gradient-to-r from-blue-500 to-cyan-400 text-white shadow">
          {task.title}
        </h3>

        {/* DESCRIPTION */}
        <p className="text-xs text-gray-300 mt-2 leading-relaxed line-clamp-2">
          {task.description || "No description"}
        </p>

      </div>

      {/* 🔥 BOTTOM SECTION */}
      <div className="flex justify-between items-center mt-3">

        {/* STATUS */}
        <span
          className={`text-xs px-3 py-1 rounded-full font-semibold
            ${
              task.status === "TODO"
                ? "bg-yellow-400/20 text-yellow-300"
                : task.status === "IN_PROGRESS"
                ? "bg-blue-500/20 text-blue-300"
                : "bg-green-500/20 text-green-300"
            }
          `}
        >
          {task.status.replace("_", " ")}
        </span>

        {/* DELETE */}
        {task.status === "DONE" && (
          <button
            onClick={() => onDelete(task.id)}
            className="bg-red-500/80 px-2 py-1 rounded-md text-xs
              hover:bg-red-600 hover:scale-105 transition"
          >
            Delete
          </button>
        )}

      </div>
    </div>
  );
}