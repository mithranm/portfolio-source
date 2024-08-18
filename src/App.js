import React, { useState } from 'react';
import { Github, Linkedin, Mail, ChevronDown, ChevronUp } from 'lucide-react';


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
  const maxLength = 100; // Adjust this value to change when the "Read More" appears

  const toggleExpand = (e) => {
    e.preventDefault();
    setIsExpanded(!isExpanded);
  };

  return (
    <a href={link} className="block">
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105 h-96 flex flex-col">
        <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold mb-2">{title}</h2>
          <div className="flex-grow overflow-hidden">
            {description.length > maxLength && !isExpanded ? (
              <>
                <p className="text-gray-600">{description.slice(0, maxLength)}...</p>
                <button 
                  onClick={toggleExpand}
                  className="text-blue-500 hover:text-blue-700 flex items-center mt-2"
                >
                  Read More <ChevronDown className="ml-1" size={16} />
                </button>
              </>
            ) : (
              <p className="text-gray-600">{description}</p>
            )}
            {isExpanded && (
              <button 
                onClick={toggleExpand}
                className="text-blue-500 hover:text-blue-700 flex items-center mt-2"
              >
                Read Less <ChevronUp className="ml-1" size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </a>
  );
};


const Projects = () => {
  const projects = [
    {
      title: "Source Code For This Website",
      description: "Click to view the source for this website.",
      imageUrl: "./images/file-not-found.png",
      link: "https://github.com/mithranm/portfolio-source"
    },
    {
      title: "CatGPT",
      description: "Click to join a discord server with an AI chatbot that roleplays a cat.",
      imageUrl: "./images/file-not-found.png",
      link: "https://github.com/mithranm/catgpt"
    },
    {
      title: "Resume",
      description: "Click to view my resume (this is outdated right now).",
      imageUrl: "./images/leone-venter-VieM9BdZKFo-unsplash.jpg",
      link: "https://drive.google.com/file/d/1HStvUm-9jVPa6aKtordWNPSnZ26o0Ge4/view?usp=sharing"
    },
    {
      title: "YouTube Video",
      description: "Click to watch a YouTube video I made. The video explains the application of the dot product in video games to calculate the field of view of a non-player character.",
      imageUrl: "./images/zombiefov90degrees.png",
      link: "https://youtu.be/mB-S07g6BKU"
    }
    ,
    {
      title: "Limit Test (Ignore this)",
      description: `Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.`,
      
imageUrl: "./images/file-not-found.png",
      link: "https://mithranm.github.io"
    }
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Projects</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((project, index) => (
          <ProjectCard key={index} {...project} />
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