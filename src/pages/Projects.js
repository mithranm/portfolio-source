import React from 'react';
import ProjectCard from '../components/ProjectCard';

const Projects = () => {
    const projects = [
      {
        title: "Website Source Code",
        description: "View the source code for this portfolio website on GitHub. The above screenshot was dynamically generated and will show an up to date time in EST under my profile picture.",
        imageUrl: "1",
        link: "https://github.com/mithranm/portfolio-source",
        useScreenshot: true
      },
      {
        title: "CatGPT",
        description: "Join a Discord server with an AI chatbot that roleplays as my cat, Molly.",
        imageUrl: "./images/MollyAI.png",
        link: "https://github.com/mithranm/catgpt"
      },
      {
        title: "PatriotHacks 2023 Winner - HoneyCar",
        description: "Check out my team's submission for PatriotHacks 2023.",
        imageUrl: "./images/honeycar.jpeg",
        link: "https://devpost.com/software/honeycar"
      },
      {
        title: "Dot Product in Video Games",
        description: "Watch my YouTube video explaining how the dot product is used in video games to calculate NPC field of view.",
        imageUrl: "./images/zombiefov90degrees.png",
        link: "https://youtu.be/mB-S07g6BKU"
      },
      {
        title: "Recursive App Preview",
        description: "This is supposed to be an infinite recursion effect, but its still a work in progress.",
        imageUrl: "/recursive-preview",
        link: "https://github.com/mithranm/portfolio-source",
        useAppRender: true
      }
    ];
  
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