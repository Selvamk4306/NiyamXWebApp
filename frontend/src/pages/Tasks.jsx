import TaskCard from "../components/TaskCard";
import { useEffect, useState } from "react";
import API from "../services/api";
import { useApp } from "../context/AppContext";
import {
  DragDropContext,
  Droppable,
  Draggable
} from "@hello-pangea/dnd";

export default function Tasks() {
  const { state, dispatch } = useApp();

  const [showForm, setShowForm] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState("");

  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM"
  });

  const todoCount = state.tasks.filter(t => t.status === "TODO").length;
  const progressCount = state.tasks.filter(t => t.status === "IN_PROGRESS").length;
  const doneCount = state.tasks.filter(t => t.status === "DONE").length;

  // FETCH
  useEffect(() => {
    API.get("/task")
      .then((res) => {
        dispatch({ type: "SET_TASKS", payload: res.data });
      })
      .catch(console.error);
  }, []);

  const handleCreateTask = async () => {
    if (!newTask.title || !selectedProjectId) {
      alert("Title and Project required");
      return;
    }

    try {
      const res = await API.post(
        `/task?projectId=${selectedProjectId}`,
        {...newTask,
          deadline
        }
      );

      dispatch({
        type: "SET_TASKS",
        payload: [...state.tasks, res.data],
      });

      setShowForm(false);
      setNewTask({
        title: "",
        description: "",
        status: "TODO"
      });
      setDeadline("");

      if (!deadline) {
        alert("Please select deadline");
        return;
      }
      setSelectedProjectId("");

    } catch (err) {
      console.error(err);
      alert("Error creating task");
    }
  };

  const columns = {
    TODO: "🟡 Todo",
    IN_PROGRESS: "🔵 In Progress",
    DONE: "🟢 Completed"
  };

  const handleDragEnd = async (result) => {
    if (!result.destination) return;

    const taskId = result.draggableId;
    const newStatus = result.destination.droppableId;

    try {
      await API.put(`/task/${taskId}`, {
        status: newStatus
      });

      const updated = state.tasks.map(t =>
        t.id === parseInt(taskId)
          ? { ...t, status: newStatus }
          : t
      );

      dispatch({ type: "SET_TASKS", payload: updated });

    } catch (err) {
      console.error(err);
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await API.delete(`/task/${id}`);

      dispatch({
        type: "SET_TASKS",
        payload: state.tasks.filter(t => t.id !== id)
      });

    } catch (err) {
      console.error(err);
    }
  };

  const [openDropdown, setOpenDropdown] = useState(false);

  const [openStatus, setOpenStatus] = useState(false);

  const statusOptions = [
    { value: "TODO", label: "Todo", color: "bg-yellow-400" },
    { value: "IN_PROGRESS", label: "In Progress", color: "bg-blue-500" },
    { value: "DONE", label: "Completed", color: "bg-green-500" },

    { value: "HIGH", label: "High Priority", color: "bg-red-500" },
    { value: "MEDIUM", label: "Medium Priority", color: "bg-yellow-500" },
    { value: "LOW", label: "Low Priority", color: "bg-green-500" }
  ];

  const [deadline, setDeadline] = useState("");

  const [openPriority, setOpenPriority] = useState(false);

  const priorityOptions = [
    { value: "HIGH", label: "High Priority", color: "bg-red-500" },
    { value: "MEDIUM", label: "Medium Priority", color: "bg-yellow-500" },
    { value: "LOW", label: "Low Priority", color: "bg-green-500" }
  ]

  return (
    <>
      {/* 🔥 HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-[Poppins] glow-hover cursor-pointer text-3xl font-bold tracking-tight">Tasks</h1>

        <button
          onClick={() => setShowForm(true)}
          className="bg-gradient-to-r from-blue-500 to-cyan-400 
          text-white px-4 py-2 rounded-lg 
          hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40 transition"
        >
          + Add Task
        </button>
      </div>

      {/* 🔥 MODAL */}
      {showForm && (
        <div className="fixed inset-0 flex items-center justify-center 
        bg-black/50 backdrop-blur-md z-50">

          <div className="w-[380px] p-6 rounded-2xl 
          bg-white/5 backdrop-blur-xl 
          border border-blue-500/20 
          shadow-lg shadow-blue-500/10">

            <h2 className="text-xl font-semibold mb-4 text-center">
              Create Task
            </h2>

            <div className="relative mb-3">
              {/* SELECT BOX */}
              <div
                onClick={() => setOpenDropdown(!openDropdown)}
                className="w-full p-3 rounded-lg 
                bg-[#0a2540]/80 border border-blue-500/20 
                flex justify-between items-center 
                cursor-pointer hover:border-blue-400 transition"
              >
                <span className="text-white">
                  {selectedProjectId
                    ? state.projects.find(p => p.id == selectedProjectId)?.name
                    : "Select Project"}
                </span>

                <span className={`text-blue-400
                  ${openDropdown ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}>
                  ▿
                </span>
              </div>

              {/* DROPDOWN */}
              {openDropdown && (
                <div className="absolute top-full mt-2 w-full 
                  bg-[#0f172a] border border-blue-500/20 
                  rounded-xl shadow-lg z-50 max-h-48 overflow-y-auto custom-scroll">

                  {state.projects.map((p) => (
                    <div
                      key={p.id}
                      onClick={() => {
                        setSelectedProjectId(p.id);
                        setOpenDropdown(false);
                      }}
                      className="p-3 cursor-pointer 
                      hover:bg-blue-500/20 transition 
                      text-white border-b border-white/5 last:border-none"
                    >
                      <div className="font-semibold">{p.name}</div>
                      <div className="text-xs text-gray-400 truncate">
                        {p.description || "No description"}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <input
              value={newTask.title}
              placeholder="Title"
              className="w-full mb-3 p-3 rounded-lg 
              bg-[#0a2540]/80 border border-blue-500/20 
              text-white placeholder-gray-400 
              focus:border-blue-400 outline-none"
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />

            <textarea
              value={newTask.description}
              placeholder="Description"
              className="w-full mb-3 p-3 rounded-lg 
              bg-[#0a2540]/80 border border-blue-500/20 
              text-white placeholder-gray-400 
              focus:border-blue-400 outline-none"
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />

            <input
              type="date"
              value={deadline}
              className="w-full mb-3 p-3 rounded-lg 
              bg-[#0a2540]/80 border border-blue-500/20 
              text-white placeholder-gray-400 
              focus:border-blue-400 outline-none"
              onChange={(e) => setDeadline(e.target.value)}
            />

            {/* Task Status */}
            <div className="relative mb-4">
              <div
                onClick={() => setOpenStatus(!openStatus)}
                className="w-full p-3 rounded-lg 
                bg-[#0a2540]/80 border border-blue-500/20 
                flex justify-between items-center cursor-pointer 
                hover:border-blue-400 transition"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      statusOptions.find(s => s.value === newTask.status)?.color
                    }`}
                  ></span>

                  <span className="text-white">
                    {statusOptions.find(s => s.value === newTask.status)?.label}
                  </span>
                </div>

                <span
                  className={`text-blue-400 transform transition-all duration-300 font-bold
                  ${openStatus ? "rotate-180 scale-110" : "rotate-0 scale-100"}`}
                >
                  ▿
                </span>
              </div>

              {/* DROPDOWN */}
              {openStatus && (
                <div className="absolute top-full mt-2 w-full 
                  bg-[#0f172a] border border-blue-500/20 
                  rounded-xl shadow-lg z-50 overflow-hidden">

                  {statusOptions.map((s) => (
                    <div
                      key={s.value}
                      onClick={() => {
                        setNewTask({ ...newTask, status: s.value });
                        setOpenStatus(false);
                      }}
                      className={`flex items-center gap-3 p-3 cursor-pointer transition
                        ${
                          newTask.status === s.value
                            ? "bg-blue-500/30"
                            : "hover:bg-blue-500/20"
                        }`}
                    >
                      <span className={`w-3 h-3 rounded-full ${s.color}`}></span>

                      <span className="text-white font-medium">
                        {s.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="relative mb-4">
              <div
                onClick={() => setOpenPriority(!openPriority)}
                className="w-full p-3 rounded-lg 
                bg-[#0a2540]/80 border border-blue-500/20 
                flex justify-between items-center cursor-pointer 
                hover:border-blue-400 transition"
              >
                <div className="flex items-center gap-2">
                  <span
                    className={`w-3 h-3 rounded-full ${
                      priorityOptions.find(p => p.value === newTask.priority)?.color
                    }`}
                  ></span>

                  <span className="text-white">
                    {priorityOptions.find(p => p.value === newTask.priority)?.label}
                  </span>
                </div>

                <span className="text-blue-400">▿</span>
              </div>

              {openPriority && (
                <div className="absolute top-full mt-2 w-full 
                  bg-[#0f172a] border border-blue-500/20 
                  rounded-xl shadow-lg z-50">

                  {priorityOptions.map((p) => (
                    <div
                      key={p.value}
                      onClick={() => {
                        setNewTask({ ...newTask, priority: p.value });
                        setOpenPriority(false);
                      }}
                      className="flex items-center gap-3 p-3 cursor-pointer hover:bg-blue-500/20"
                    >
                      <span className={`w-3 h-3 rounded-full ${p.color}`}></span>
                      <span className="text-white">{p.label}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <button
                onClick={handleCreateTask}
                className="flex-1 bg-gradient-to-r from-blue-500 to-cyan-400 
                py-2 rounded-lg text-white hover:scale-105 transition"
              >
                Save
              </button>

              <button
                onClick={() => setShowForm(false)}
                className="flex-1 bg-white/10 py-2 rounded-lg hover:bg-white/20"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 🔥 TASK BOARD */}
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="grid grid-cols-3 gap-6 overflow-x-hidden">

          {Object.keys(columns).map((status) => {
            let count = 0;

            if (status === "TODO") count = todoCount;
            else if (status === "IN_PROGRESS") count = progressCount;
            else if (status === "DONE") count = doneCount;

            return (
              <Droppable key={status} droppableId={status}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="bg-[#0f172a]/80 
                    border border-blue-500/20 
                    p-4 rounded-xl 
                    h-[70vh] flex flex-col"
                  >

                    {/* 🔥 HEADER (STICKY) */}
                    <h2 className="text-lg font-semibold mb-3 
                    px-3 py-2 rounded-lg bg-white/10 
                    sticky top-0 z-10 backdrop-blur-md">
                      {columns[status]} ({count})
                    </h2>

                    {/* 🔥 SCROLL AREA */}
                    <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scroll">

                      {state.tasks
                        .filter(t => t.status === status)
                        .map((task, index) => (
                          <Draggable
                            key={task.id}
                            draggableId={task.id.toString()}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  ...provided.draggableProps.style,
                                  transition: "transform 0.15s ease"
                                }}
                              >
                                <TaskCard
                                  task={task}
                                  onDelete={handleDeleteTask}
                                />
                              </div>
                            )}
                          </Draggable>
                        ))}

                      {provided.placeholder}
                    </div>

                  </div>
                )}
              </Droppable>
            );
          })}

        </div>
      </DragDropContext>
    </>
  );
}