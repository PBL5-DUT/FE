import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PmDetail from './pages/PM/PmDetailPage'; 
import PmManager from './pages/PM/PmManagerPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="PmDetail/:id" element={<PmDetail />} />
        <Route path="/project-manager" element={<PmManager />} /> 
      </Routes>
    </Router>
  );
};

export default App;