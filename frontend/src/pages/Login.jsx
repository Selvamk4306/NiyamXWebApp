import { useState } from "react";
import { loginUser } from "../services/api";
import { useApp } from "../context/AppContext";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const { dispatch } = useApp();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      const res = await loginUser(form);

      const token = res.data.token;
      const name = res.data.name;
      const email = res.data.email;

      localStorage.setItem("token", token);
      localStorage.setItem("user", JSON.stringify({ name, email }));

      dispatch({ type: "SET_TOKEN", payload: token });
      dispatch({ type: "SET_USER", payload: { name, email } });

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-2 ">

      {/* 🔥 LEFT SIDE */}
      <div className="relative flex flex-col justify-center items-center text-white p-10 overflow-hidden">

        {/* 🔥 BACKGROUND GRADIENT */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a2540] to-[#2563eb] "/>

        {/* 🔥 GLOW EFFECT */}
        <div className="absolute w-[400px] h-[400px] bg-blue-500/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 blur-[100px] rounded-full bottom-[-100px] right-[-50px]" 
        />

        {/* 🔥 CONTENT */}
        <div className="relative z-10 text-center">

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Mini Jira 🚀
          </h1>

          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            Manage your projects, track tasks, and boost productivity with a modern workflow system.
          </p>

          {/* 🔥 FEATURE LIST */}
          <div className="mt-8 space-y-3 text-sm text-gray-300">
            <p>✔ Smart Task Tracking</p>
            <p>✔ Real-time Updates</p>
            <p>✔ Drag & Drop Workflow</p>
          </div>

        </div>
      </div>

      {/* 🔥 RIGHT SIDE */}
      <div className="flex justify-center items-center ">

        <div className="w-[400px] p-10 rounded-2xl 
          bg-white/5 backdrop-blur-xl 
          border border-blue-500/20 
          shadow-lg shadow-blue-500/10
          ">

          {/* TITLE */}
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Welcome Back 👋
          </h2>

          {/* INPUTS */}
          <input
            placeholder="Email"
            className="w-full mb-4 p-3 rounded-lg 
              bg-white/10 border border-blue-500/20 
              text-white placeholder-gray-400 
              focus:border-blue-400 outline-none"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-3 rounded-lg 
              bg-white/10 border border-blue-500/20 
              text-white placeholder-gray-400 
              focus:border-blue-400 outline-none"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          {/* BUTTON */}
          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 
              text-white py-3 rounded-lg 
              hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          {/* LINKS */}
          <p className="mt-4 text-center text-sm text-gray-300">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-400 font-semibold">
              Register
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}