import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { useApp } from "../context/AppContext";

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];

    return (
      <div className="bg-purple-800 p-3 rounded-lg shadow-lg text-sm">
        <p className="font-semibold">{data.name}</p>
        <p>Tasks: {data.value}</p>
      </div>
    );
  }
  return null;
};

export default function TaskChart() {
  const { state } = useApp();

  const statusCount = {
    TODO: 0,
    IN_PROGRESS: 0,
    DONE: 0,
  };

  state.tasks.forEach((t) => {
    if (statusCount[t.status] !== undefined) {
      statusCount[t.status]++;
    }
  });

  const data = [
    { name: "Todo", value: statusCount.TODO },
    { name: "In Progress", value: statusCount.IN_PROGRESS },
    { name: "Done", value: statusCount.DONE },
  ];

  const COLORS = ["#facc15", "#38bdf8", "#22c55e"];

  const getColor = (value) => {
  if (value < 30) return "#ef4444"; // red
  if (value < 70) return "#facc15"; // yellow
  return "#22c55e"; // green
};

  return (
    <div className="bg-white/10 backdrop-blur-md p-6 rounded-xl shadow-xl">
      <h2 className="mb-4 font-semibold">Task Status</h2>

      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            outerRadius={110}
            innerRadius={0}
            labelLine={false}
            

            // 🔥 ENTRY ANIMATION
            isAnimationActive={true}
            animationDuration={800}
            animationEasing="ease-out"

            label={({ cx, cy, midAngle, outerRadius, value, index }) => {
              if (value === 0) return null;

              const RADIAN = Math.PI / 180;
              const radius = outerRadius * 0.6;

              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              const labels = ["TODO", "IN PROGRESS", "DONE"];

              return (
                <text
                  x={x}
                  y={y}
                  fill="white"
                  textAnchor="middle"
                  dominantBaseline="central"
                  style={{
                    opacity: 0.9,
                    transition: "all 0.3s ease"
                  }}
                >
                  <tspan x={x} dy="-0.3em" fontSize="18" fontWeight="700"
                  style={{fontFamily: "Poppins, sans-serif"}}>
                    {value}
                  </tspan>

                  <tspan x={x} dy="1.2em" fontSize="10" fill="#f2f3f6"
                  style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.5px" }}>
                    {labels[index]}
                  </tspan>
                </text>
              );
            }}
          >
            {data.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[index]}

                // 🔥 HOVER EFFECT
                style={{
                  transition: "all 0.3s ease",
                  cursor: "pointer"
                }}

                // optional slight grow effect
                onMouseEnter={(e) => {
                  e.target.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.target.style.transform = "scale(1)";
                }}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}