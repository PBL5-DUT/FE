import React, { createContext, useState, useEffect } from "react";
import { apiConfig } from "../config/apiConfig";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (inputs) => {
    try {
      const res = await apiConfig.post("/v1/auth/login", inputs, {
        withCredentials: true,
      });

      // Lưu thông tin người dùng và token
      const user = res.data.user; // Giả sử thông tin người dùng nằm trong res.data.user
      const token = res.data.token; // Giả sử token nằm trong res.data.token

      if (user && token) {
        setCurrentUser(user);
        localStorage.setItem("user", JSON.stringify(user)); // Lưu user vào localStorage
        localStorage.setItem("token", token); // Lưu token vào localStorage
        console.log("User and token saved to localStorage.");
        console.log("User:", user);
        console.log("Token:", token);
      } else {
        console.error("Login response does not contain user or token.");
      }
    } catch (error) {
      console.error("Login error:", error);
      throw error;
    }
  };
  const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setCurrentUser(null); 
  };

  useEffect(() => {
    if (!currentUser) {
      localStorage.removeItem("user");
      localStorage.removeItem("token"); 
    }
  }, [currentUser]);

  return (
    <AuthContext.Provider value={{ currentUser, setCurrentUser, login,logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};