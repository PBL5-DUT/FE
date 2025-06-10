import React from "react";
import ProjectCard from "./ProjectCard";

const ProjectList = ({ projects }) => {
  const validProjects = projects?.filter(project => 
    project != null && 
    project.projectId != null
  ) || [];

  if (validProjects.length === 0) {
    return <div className="text-center">Không có dự án nào để hiển thị.</div>;
  }

  return (
    <div 
      className="gap-4"
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)', // Cố định 2 cột
        gridAutoFlow: 'row dense' // Tự động lấp đầy khoảng trống
      }}
    >
      {validProjects.map((project, index) => (
        <ProjectCard 
          key={project.projectId || index} 
          project={project} 
        />
      ))}
    </div>
  );
};

export default ProjectList;