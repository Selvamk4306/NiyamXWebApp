import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { useApp } from "./context/AppContext";

function App() {
  const {state} = useApp();
  const isAuth = state.token;

  if (state.loading) {
    return <div>Loading...</div>;
  }

 return (
    <BrowserRouter>
      <Routes>

        {/* DEFAULT */}
        <Route path="/" element={<Navigate to="/login" />} />

        {/* AUTH */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* PROTECTED WRAPPER */}
        <Route element={state.token ? <Layout /> : <Navigate to="/login" />}>

          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;