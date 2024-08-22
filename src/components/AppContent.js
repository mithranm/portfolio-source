// AppContent.js
import React from 'react';
import { Route, Routes, NavLink, useLocation } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import Projects from '../pages/Projects';
import Documentation from '../pages/Documentation';

const Header = () => (
    <header className="bg-gray-900 text-white py-6">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold mb-2">Mithran Mohanraj</h1>
        <p className="text-lg mb-3">GMU Computer Science, Senior, Graduating 2025</p>
        <div className="flex space-x-4 mb-2">
          <a href="https://github.com/mithranm" className="hover:text-gray-300 flex items-center" aria-label="GitHub">
            <Github size={20} className="mr-1" /> GitHub
          </a>
          <a href="https://www.linkedin.com/in/mithran-mohanraj/" className="hover:text-gray-300 flex items-center" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <Linkedin size={20} className="mr-1" /> LinkedIn
          </a>
          <a href="mailto:mithran.mohanraj@gmail.com" className="hover:text-gray-300 flex items-center" aria-label="Email">
            <Mail size={20} className="mr-1" /> Email
          </a>
        </div>
      </div>
    </header>
  );
  
  const SubHeader = () => (
    <nav className="bg-gray-800 text-white py-2">
      <div className="container mx-auto px-4">
        <ul className="flex space-x-6">
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => 
                isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"
              }
              end
            >
              Projects
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/documentation" 
              className={({ isActive }) => 
                isActive ? "border-b-2 border-white pb-1" : "hover:text-gray-300"
              }
            >
              Documentation
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
  
  const Footer = () => (
    <footer className="bg-gray-900 text-white py-4">
      <div className="container mx-auto px-4 text-center">
        <p>©Mithran Mohanraj {new Date().getFullYear()}</p>
      </div>
    </footer>
  );

const AppContent = ({ isNested = false, nestedLevel = 0 }) => {
  const location = useLocation();
  const isProjectsPage = location.pathname === '/' || location.hash === '#/';

  return (
    <div className={`min-h-screen flex flex-col ${isNested ? 'scale-90' : ''}`}>
      {(!isNested || nestedLevel === 0) && isProjectsPage && <Header />}
      {(!isNested || nestedLevel === 0) && <SubHeader />}
      <main className="flex-grow bg-gray-100">
        <Routes>
          <Route path="/" element={<Projects nestedLevel={nestedLevel} />} />
          <Route path="/documentation" element={<Documentation />} />
        </Routes>
      </main>
      {(!isNested || nestedLevel === 0) && <Footer />}
    </div>
  );
};

export default AppContent;