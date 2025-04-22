import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }) => {
  if (!projects || projects.length === 0) {
    return <div className="text-center">Không có dự án nào để hiển thị.</div>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.projectId} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;