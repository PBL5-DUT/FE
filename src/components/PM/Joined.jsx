import React from "react";
import { Routes, Route } from "react-router-dom";
import ProjectList from "./ProjectList";
import ProjectDetail from "./ProjectDetail";

const Joined = () => {
  return (
    <div>
      {/* Điều hướng giữa danh sách dự án và chi tiết dự án */}
      <Routes>
        <Route path="/" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
      </Routes>
    </div>
  );
};

export default Joined;
