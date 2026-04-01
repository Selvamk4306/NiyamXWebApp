export default function StatCard({ title, value }) {
  return (
    <div className="bg-white/5 backdrop-blur-xl 
      border border-blue-500/20 
      p-6 rounded-2xl 
      shadow-lg shadow-blue-500/10 
      hover:scale-[1.03] hover:shadow-blue-500/30 
      transition duration-300">

      {/* TITLE */}
      <h3 className="text-xs uppercase tracking-wider text-gray-400">
        {title}
      </h3>

      {/* VALUE */}
      <p className="text-4xl font-bold mt-3 
        bg-gradient-to-r from-blue-400 to-cyan-300 
        bg-clip-text text-transparent">
        {value}
      </p>

    </div>
  );
}