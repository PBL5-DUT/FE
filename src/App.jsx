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
import JoinedProject from "./pages/VLT/JoinedProject";
import ForumOverview from "./pages/VLT/ForumOverview";
import Forum from "./pages/VLT/Forum";
import ChatButton from "./components/VLT/ChatButton";

import PmDetail from './pages/PM/PmDetailPage';
import PmManager from './pages/PM/PmManagerPage';
import DonationChart from "./components/PM/DonationChart";

import ChatPage from "./pages/VLT/ChatPage";
import PMForumOverview from "./pages/PM/ForumOverview";
import PMForum from "./pages/PM/Forum";


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
          <div className="h-screen flex flex-col">
            {/* Header cố định */}
            <div className="bg-white shadow-md z-50 h-[64px] flex-shrink-0 fixed w-full">
              <Header />
            </div>

            {/* Nội dung bên dưới Header */}
            <div className="h-screen flex flex-col pt-[64px]">
              <div className="flex-1 overflow-y-auto">
                <Outlet />
              </div>
              <ChatButton />
            </div>
          </div>
        </ProtectedRoute>
      ),
      children: [
        {
          path: "/",
          element: <Navigate to="/home" replace />,
        },
        {
          path: "/home",
          element: <Home />,
        },
        {
          path: "/profile",
          element: <Profile />,
        },
        {
          path: "/chatpage",
          element: <ChatPage />,
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
          element: <AboutUs />,
        },
        {
          path: "/joined",
          element: <JoinedProject />,
        },
        {
          path: "/project/:id/statistics",
          element: <DonationChart />,
        },
        {
          path: "/forumoverview/:projectId",
          element: <ForumOverview />,
        },
        {
          path: "/forum/:forumId",
          element: <Forum />,
        },
       {
          path: "/PMforumoverview/:projectId",
          element: <PMForumOverview />,
        },
        {
          path: "/PMforum/:forumId",
          element: <PMForum />,
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