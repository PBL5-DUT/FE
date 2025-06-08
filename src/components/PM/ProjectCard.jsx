import { Link } from "react-router-dom";

const ProjectCard = ({ project }) => {
  return (
    <Link to={`/projects/${project.projectId}`} className="block">
      <div className="flex border rounded-lg shadow-md p-4 bg-white w-full">
        <img
          src={project.avatarFilepath}
          alt={project.name}
          className="w-96 h-64 rounded-lg object-cover"
        />
        <div className="ml-6 flex-1">
          <h2 className="text-lg font-bold">{project.name}</h2>
          <p className="text-sm text-gray-600">{project.location}</p>
          <p className="text-gray-700 mt-8">{project.description}</p>
          <p className="text-gray-700 mt-8">{project.max}</p>
          <p className="text-gray-700 mt-4">{project.date}</p>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;