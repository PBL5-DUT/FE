import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import { UserProvider } from './user/UserProvider';
import PmDetail from './pages/PM/PmDetailPage'; 
import PmManager from './pages/PM/PmManagerPage';
import Home from './pages/VLT/Home';


const App = () => {
  return (
    <Router>
      <Routes>
     <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/login" />} />
        <Route path="PmDetail/:id" element={<PmDetail />} />
        <Route path="/project-manager" element={<PmManager />} /> 
      </Routes>
    </Router>

  );
};

export default App;