import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LabelList
} from "recharts";

import { useApp } from "../context/AppContext";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;

    return (
      <div className="bg-purple-800 p-3 rounded-lg shadow-lg text-sm">
        <p className="font-semibold">{data.name}</p>
        <p>Progress: {data.progress}%</p>
      </div>
    );
  }
  return null;
};

export default function ProjectChart({ projects }) {
  const { state } = useApp();

  // 🔥 REAL PROGRESS CALCULATION
  const data = projects.map((p) => {
    const projectTasks = state.tasks.filter(
      (t) => t.project?.id === p.id   // 🔥 safe access
    );

    const total = projectTasks.length;
    const done = projectTasks.filter(
      (t) => t.status === "DONE"
    ).length;

    const inProgress = projectTasks.filter(
      (t) => t.status === "IN_PROGRESS"
    ).length;

    const progress =
      total === 0 ? 0 : Math.round((done + inProgress * 0.5)/total * 100);

    return {
      name: p.name.length > 10 ? p.name.slice(0, 10) + "..." : p.name,
      progress
    };
  });

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl min-h-[350px]">

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>

          {/* 🔥 GRADIENT */}
          <defs>
            <linearGradient id="gradient">
              <stop offset="0%" stopColor="#3b82f6" />
              <stop offset="100%" stopColor="#22d3ee" />
            </linearGradient>
          </defs>

          <XAxis dataKey="name" stroke="#ddd" interval={0} angle={-20} textAnchor="end" height={60}/>
          <YAxis stroke="#ddd" />

          {/* 🔥 ANIMATED BAR */}
          <Bar
            dataKey="progress"
            radius={[10, 10, 0, 0]}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill="url(#gradient)" />
            ))}

            {/* 🔥 CENTER LABEL */}
            <LabelList
              dataKey="progress"
              position="inside"
              formatter={(value) => `${value}%`}
              style={{
                fill: "white",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            />
          </Bar>

        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}