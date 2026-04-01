import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  console.log("Token Snet : ", token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

// AUTH
export const loginUser = (data) => API.post("/auth/login", data);
export const registerUser = (data) => API.post("/auth/register", data);

// PROJECT
export const getProjects = () => API.get("/projects");
export const createProject = (project, workspaceId) =>
  API.post(`/projects?workspaceId=${workspaceId}`, project);

export default API;