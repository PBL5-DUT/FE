import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

import Home from './pages/VLT/Home'; 
import Information from './pages/VLT/Infomation';
import AboutUs from './pages/VLT/AboutUs';
import Profile from './pages/VLT/Profile';
import ProjectDetail from "./pages/VLT/ProjectDetail";
import { UserProvider } from './user/UserProvider';

import PmDetail from './pages/PM/PMDetailPage';
import PmManager from './pages/PM/PmManagerPage';


const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />       
      <Route path="/information" element={<Information />} /> 
      <Route path="/aboutus" element={<AboutUs />} /> 
      <Route path="/profile" element={<Profile />} /> 
      <Route path="/projects/:id" element={<ProjectDetail />} />
      <Route path="PmDetail/:id" element={<PmDetail />} />
      <Route path="/project-manager" element={<PmManager />} />  
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};


const App = () => {
  return (
    <UserProvider>
      <Router>

        <AppRoutes />

      </Router>
    </UserProvider>
  );
};

export default App;
