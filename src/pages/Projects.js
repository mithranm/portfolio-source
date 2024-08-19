import { getProjectsData } from '../utils/projectLoader';
import ProjectCard from '../components/ProjectCard'

const Projects = () => {
  const projects = getProjectsData();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard 
            key={index} 
            {...project} 
            projects={projects.filter(p => !p.useAppRender)}
          />
        ))}
      </div>
    </div>
  );
};

export default Projects;
