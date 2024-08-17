import React from 'react';
import { useState } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';

const Header = () => (
  <header className="bg-gray-900 text-white py-8">
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-2">Mithran Mohanraj</h1>
      <p className="text-xl mb-4">GMU Computer Science, Senior, Graduating 2025</p>
      <div className="flex space-x-4">
        <a href="https://github.com/mithranm" className="hover:text-gray-300"><Github /></a>
        <a href="#" className="hover:text-gray-300"><Linkedin /></a>
        <a href="mailto:your.email@example.com" className="hover:text-gray-300"><Mail /></a>
      </div>
    </div>
  </header>
);

const ProjectCard = ({ title, description, imageUrl, link }) => (
  <a href={link} className="block">
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out hover:scale-105">
      <img src={imageUrl} alt={title} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">{title}</h2>
        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  </a>
);

const Projects = () => {
  const projects = [
    {
      title: "Source Code For This Website",
      description: "Click to view the source for this website.",
      imageUrl: "./images/file-not-found.png",
      link: "https://github.com/mithranm/portfolio-source"
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