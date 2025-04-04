import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PmDetail from './pages/PM/PmDetailPage'; 
import PmManager from './pages/PM/PmManagerPage';
import PMDetail from './components/PM/PMDetail';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="projects/:id" element={<PmDetail />} />
        <Route path="/project-manager" element={<PmManager />} /> 
        <Route path="/PMproject/:id" element={<PMDetail />} /> 
      </Routes>
    </Router>
  );
};

export default App;