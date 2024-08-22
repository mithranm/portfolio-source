import React from 'react';
import ProjectCard from '../components/ProjectCard';
import NestedProjectCard from '../components/NestedProjectCard';
import projects from '../data/projects.json';

const Projects = ({ nestedLevel = 0 }) => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          project.isNested ? (
            <NestedProjectCard key={index} {...project} level={nestedLevel} />
          ) : (
            <ProjectCard key={index} {...project} />
          )
        ))}
      </div>
    </div>
  );
};

export default Projects;