import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Find from "./Find";
import ProjectList from "./ProjectList";
import ProjectDetail from "./ProjectDetail";

const Home = () => {
  const location = useLocation();
  const isRoot = location.pathname === "/";

  return (
    <div>
      {isRoot && <Find />}

      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
};

export default Home;
