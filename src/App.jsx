import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import PmDetail from './pages/PM/PmDetailPage'; 
import PmManager from './pages/PM/PmManagerPage';
import Forum from './pages/PM/ForumPM';
import PjDetail from './components/PM/ProjectDetail';
import { UserProvider } from './user/UserProvider';

import Home from './pages/VLT/Home';

const App = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="PmDetail/:id" element={<PmDetail />} />
          <Route path="/project-manager" element={<PmManager />} />  
          <Route path="/forum" element={<Forum />} />
          <Route path="/forum/:id" element={<Forum />} />     
          <Route path="/test" element={<PjDetail />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};

export default App;
