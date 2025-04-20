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

const ProtectedRoute = ({ children }) => {
  const { currentUser } = React.useContext(AuthContext);

  if (!currentUser) {
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
          path: "/home",
          element: <Home /> ,            
        },

        {
          path: "/profile",
          element: <Profile />,
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