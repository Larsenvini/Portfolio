import React, { useState } from "react";
import { Briefcase } from "lucide-react";
import { FaGithub } from "react-icons/fa";

const ProjectCard = ({ project }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="project-card bg-white shadow-md rounded-lg overflow-hidden 
        transform transition-all duration-500 
        hover:scale-105 hover:shadow-lg"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="p-6 flex flex-col h-full">
        {/* Project Title */}
        <h3 className="text-2xl font-semibold mb-3 text-gray-900">{project.title}</h3>

        {/* Project Preview Image */}
        <div className="mb-4">
          <img
            src={project.previewImage}
            alt={`${project.title} Preview`}
            className="w-full h-48 object-cover rounded-lg shadow-sm"
          />
        </div>

        {/* Project Description */}
        <p className="text-gray-600 mb-4 flex-grow">{project.description}</p>

        {/* Technologies Used */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span
              key={index}
              className="bg-blue-100 text-blue-600 text-sm font-medium px-3 py-1 rounded-full"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex space-x-4 mt-auto">
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition flex items-center font-medium"
          >
            <FaGithub className="text-lg mr-2" />
            GitHub
          </a>
          <a
            href={project.liveLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition flex items-center font-medium"
          >
            <Briefcase className="text-lg mr-2" />
            Live Project
          </a>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
