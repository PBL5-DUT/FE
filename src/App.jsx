import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import Home from './components/Home'; 
import ProjectDetail from './components/ProjectDetail'; 
import Joined from './components/Joined'; 
import PjManager from './components/PjManager';
import PMDetail from './components/PMDetail';

const App = () => {
  return (
    <Router>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path="projects/:id" element={<ProjectDetail />} />
          </Route>
          <Route path="/joined" element={<Joined />} />
          <Route path="/project-manager" element={<PjManager />} /> 
          <Route path="/PMproject/:id" element={<PMDetail />} /> 
          {/* Thêm các route khác nếu cần */}
        </Routes>
      </main>
    </Router>
  );
};

export default App;