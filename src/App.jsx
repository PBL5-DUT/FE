import React from "react";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import { AuthContextProvider, AuthContext } from "./util/AuthContext";
import Header from "./components/VLT/Header";
import Home from "./pages/VLT/Home";
import Profile from "./pages/VLT/Profile";
import ProjectDetail from "./pages/VLT/ProjectDetail";
import Information from "./pages/VLT/Information";
import AboutUs from "./pages/VLT/AboutUs";


import PmDetail from './pages/PM/PMDetailPage';
import PmManager from './pages/PM/PmManagerPage';
import DonationChart from "./components/PM/DonationChart";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
};

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <Header />
          <Outlet />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to="/home" replace />, // Điều hướng từ "/" đến "/home"
        },
        {
          path: "/home",
          element: <Home /> ,            
        },

        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/projects/:id",
          element: <ProjectDetail />,
        },
        {
          path: "PmDetail/:id",
          element: <PmDetail />,
        },
        {
          path: "/project-manager",
          element: <PmManager />,
        },       
        {
          path: "/information",
          element: <Information />,
        },
        {
          path: "/aboutus",
          element: <AboutUs/>,
        },
        {
          path: "/project/:id/statistics",
          element: <DonationChart />
        },
      ],
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    
  ]);

  return (
    <AuthContextProvider>
      <RouterProvider router={router} />
    </AuthContextProvider>
  );
}

export default App;