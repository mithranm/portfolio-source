import React, { useState, useRef, useEffect } from 'react';
import { Github, Linkedin, Mail, X, ExternalLink, ChevronDown } from 'lucide-react';


const Header = () => (
  <header className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-2">Mithran Mohanraj</h1>
      <p className="text-xl mb-4">GMU Computer Science, Senior, Graduating 2025</p>
      <div className="flex space-x-4">
        <a href="https://github.com/mithranm" className="hover:text-gray-300"><Github /></a>
        <a href="https://www.linkedin.com/in/mithran-mohanraj/" className="hover:text-gray-300" target="_blank" rel="noopener noreferrer">
          <Linkedin />
        </a>
        <a href="mailto:mithran.mohanraj@gmail.com" className="hover:text-gray-300"><Mail /></a>
      </div>
    </div>
  </header>
);

const ProjectCard = ({ title, description, imageUrl, link }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showReadMore, setShowReadMore] = useState(false);
  const descriptionRef = useRef(null);

  useEffect(() => {
    if (descriptionRef.current) {
      setShowReadMore(descriptionRef.current.scrollHeight > descriptionRef.current.clientHeight);
    }
  }, [description]);

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
    document.body.style.overflow = isExpanded ? 'auto' : 'hidden';
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={toggleExpand}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 flex flex-col h-full relative">
          <div className="relative pb-[56.25%]">
            <img src={imageUrl} alt={title} className="absolute top-0 left-0 w-full h-full object-cover" />
          </div>
          <div className="p-4 flex flex-col flex-grow">
            <h2 className="text-xl font-semibold mb-2 group-hover:text-blue-600 line-clamp-2">{title}</h2>
            <div className="flex-grow overflow-hidden">
              <p 
                ref={descriptionRef}
                className="text-gray-600 line-clamp-2"
              >
                {description}
              </p>
              {showReadMore && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleExpand(e);
                  }}
                  className="text-blue-500 hover:text-blue-700 flex items-center mt-2"
                >
                  Read More <ChevronDown className="ml-1" size={16} />
                </button>
              )}
            </div>
          </div>
          <div className="absolute bottom-2 right-2 text-blue-500 group-hover:text-blue-700 transition-transform duration-300 ease-in-out transform group-hover:scale-95">
            <ExternalLink size={20} />
          </div>
        </div>
      </div>
      {isExpanded && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-full overflow-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <h2 className="text-2xl font-bold">{title}</h2>
                <button 
                  onClick={toggleExpand}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <X size={24} />
                </button>
              </div>
              <img src={imageUrl} alt={title} className="w-full h-64 object-cover mb-4 rounded" />
              <p className="text-gray-600 mb-4">{description}</p>
              <a 
                href={link} 
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit Project
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Source Code For This Website",
      description: "View the source code for this portfolio website on GitHub.",
      imageUrl: "./images/github.png",
      link: "https://github.com/mithranm/portfolio-source"
    },
    {
      title: "CatGPT",
      description: `Join a Discord server with an AI chatbot that roleplays as a my cat, Molly.
      
      This chatbot system uses Discord as a frontend. Messages are logged to a Discord.js project which sends conversation as prompts to a Retrieval Augment Generation enhanced LLM. Google Gemini 1.5 Pro to create queries for RAG. The RAG system is powered by Perplexity AI and a Vector Database of Personal Information. The LLM producing the final response is Gemini 1.5 flash.
      `,
      imageUrl: "./images/MollyAI.png",
      link: "https://github.com/mithranm/catgpt"
    },
    {
      title: "Resume",
      description: "View my professional resume (Note: currently outdated).",
      imageUrl: "./images/leone-venter-VieM9BdZKFo-unsplash.jpg",
      link: "https://drive.google.com/file/d/1HStvUm-9jVPa6aKtordWNPSnZ26o0Ge4/view?usp=sharing"
    },
    {
      title: "Dot Product in Video Games",
      description: "Watch my YouTube video explaining how the dot product is used in video games to calculate NPC field of view.",
      imageUrl: "./images/zombiefov90degrees.png",
      link: "https://youtu.be/mB-S07g6BKU"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} heightClass="h-[24rem]" />
        ))}
      </div>
    </div>
  );
};

const Footer = () => (
  <footer className="bg-gray-900 text-white py-4">
    <div className="container mx-auto px-4 text-center">
      <p>©Mithran Mohanraj {new Date().getFullYear()}</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <Projects />
      </main>
      <Footer />
    </div>
  );
};

export default App;