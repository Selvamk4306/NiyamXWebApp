import { createContext, useReducer, useContext, useEffect } from "react";
import API from "../services/api";

const AppContext = createContext();

const initialState = {
  projects: [],
  tasks: [],
  user: null,
  token: null,
  loading: true,
  theme: localStorage.getItem("theme") || "dark",
  workspaceId: null,
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_PROJECTS":
      return { ...state, projects: action.payload };

    case "SET_TASKS":
      return { ...state, tasks: action.payload };

    case "SET_USER":
      return { ...state, user: action.payload };

    case "SET_TOKEN":
      return { ...state, token: action.payload };
    
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_THEME":
      return { ...state, theme: action.payload };

    case "SET_WORKSPACE_ID":
      return { ...state, workspaceId: action.payload };

    default:
      return state;
  }
}

export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    if (token && user) {
      dispatch({ type: "SET_TOKEN", payload: token });
      dispatch({ type: "SET_USER", payload: JSON.parse(user) });

      API.get("/projects")
        .then((res) => {
          dispatch({ type: "SET_PROJECTS", payload: res.data });
        })
        .catch(console.error);

      API.get("/task")
        .then((res) => {
          dispatch({ type: "SET_TASKS", payload: res.data });
        })
        .catch(console.error);
    }

    dispatch({ type: "SET_LOADING", payload: false });
  }, []);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}