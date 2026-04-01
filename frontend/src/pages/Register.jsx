import { useState } from "react";
import { registerUser } from "../services/api";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);

    try {
      await registerUser(form);
      alert("Registered successfully");
      navigate("/login");
    } catch (error) {
      if (error.response?.data?.error) {
        alert(error.response.data.error);
      } else {
        alert("Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen grid grid-cols-2">

      {/* 🔥 LEFT SIDE (UPGRADED PANEL) */}
      <div className="relative flex flex-col justify-center items-center text-white p-10 overflow-hidden">

        {/* BACKGROUND */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#020617] via-[#0a2540] to-[#2563eb]" />

        {/* GLOW */}
        <div className="absolute w-[400px] h-[400px] bg-blue-500/30 blur-[120px] rounded-full top-[-100px] left-[-100px]" />
        <div className="absolute w-[300px] h-[300px] bg-cyan-400/20 blur-[100px] rounded-full bottom-[-100px] right-[-50px]" />

        {/* CONTENT */}
        <div className="relative z-10 text-center">

          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
            Join Mini Jira ✨
          </h1>

          <p className="text-gray-300 text-lg max-w-md leading-relaxed">
            Create your account and start managing your workflow efficiently.
          </p>

          {/* FEATURES */}
          <div className="mt-8 space-y-3 text-sm text-gray-300">
            <p>✔ Create & Manage Projects</p>
            <p>✔ Track Tasks Easily</p>
            <p>✔ Boost Productivity</p>
          </div>

        </div>
      </div>

      {/* 🔥 RIGHT SIDE (FORM) */}
      <div className="flex justify-center items-center">

        <div className="w-[400px] p-10 rounded-2xl 
          bg-white/5 backdrop-blur-xl 
          border border-blue-500/20 
          shadow-lg shadow-blue-500/10">

          {/* TITLE */}
          <h2 className="text-2xl font-semibold mb-6 text-center">
            Create Account
          </h2>

          {/* INPUTS */}
          <input
            placeholder="Name"
            className="w-full mb-4 p-3 rounded-lg 
              bg-white/10 border border-blue-500/20 
              text-white placeholder-gray-400 
              focus:border-blue-400 outline-none"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
            onClick={handleRegister}
            className="w-full bg-gradient-to-r from-blue-500 to-cyan-400 
              text-white py-3 rounded-lg 
              hover:scale-105 hover:shadow-lg hover:shadow-blue-500/40"
          >
            {loading ? "Creating..." : "Register"}
          </button>

          {/* LINKS */}
          <p className="mt-4 text-center text-sm text-gray-300">
            Already have an account?{" "}
            <Link to="/login" className="text-blue-400 font-semibold">
              Login
            </Link>
          </p>

        </div>
      </div>

    </div>
  );
}