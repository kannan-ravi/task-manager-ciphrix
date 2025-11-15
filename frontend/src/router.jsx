import { createBrowserRouter } from "react-router";
import Dashboard from "./pages/dashboard/Dashboard";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import TaskCreate from "./pages/task/TaskCreate";
import TaskEdit from "./pages/task/TaskEdit";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Dashboard />,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/task/create",
    element: <TaskCreate />,
  },
  {
    path: "/task/edit/:id",
    element: <TaskEdit />,
  },
]);
