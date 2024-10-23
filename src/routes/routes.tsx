import { createBrowserRouter, Navigate } from "react-router-dom";
import { Home } from "../pages/home/home";
import { Login } from "../pages/login/login";
import { ProtectedRoute } from "../components/protected-route/protected-route";
import HomeLayout from "../layouts/home/home-layout";

export const routes = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/login" replace />,
  },

  {
    path: "/login",
    element: <Login />,
  },

  {
    path: "/home",
    element: <ProtectedRoute children={<HomeLayout />} />,
    children: [
      {
        path: "/home",
        element: <Home />,
      }
    ]
  },

])