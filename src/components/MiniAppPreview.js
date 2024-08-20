import React from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import ServerScreenshot from './ServerScreenshot'

const MiniProjectCard = ({ title, imageUrl, depth, useAppRender, useScreenshot, projects, serverIndex }) => (
  <div className="bg-white shadow rounded overflow-hidden" style={{ aspectRatio: '4/3' }}>
    <div className="relative w-full h-full">
      {useAppRender && depth < 3 ? (
        <MiniAppPreview projects={projects} depth={depth + 1} />
      ) : useScreenshot ? (
        <ServerScreenshot serverIndex={serverIndex} />
      ) : (
        <img src={imageUrl} alt={title} className="absolute top-0 left-0 w-full h-full object-cover" />
      )}
    </div>
    {depth < 2 && (
      <div className="absolute bottom-0 left-0 right-0 bg-white bg-opacity-75 p-1">
        <h3 className="text-[4px] font-semibold truncate">{title}</h3>
      </div>
    )}
  </div>
);

const MiniAppPreview = ({ projects = [], depth = 0 }) => {
  const scale = Math.pow(0.4, depth);
  const showText = depth < 2;
  
  return (
    <div className="w-full h-full bg-white overflow-hidden flex flex-col" style={{ fontSize: `${12 * scale}px` }}>
      {showText && (
        <header className="bg-gray-900 text-white p-1" style={{ padding: `${4 * scale}px` }}>
          <div className="container mx-auto">
            <h1 className="font-bold" style={{ fontSize: `${6 * scale}px` }}>Mithran Mohanraj</h1>
            <p style={{ fontSize: `${4 * scale}px` }}>GMU Computer Science, Senior, Graduating 2025</p>
            <div className="flex space-x-1">
              <Github size={4 * scale} />
              <Linkedin size={4 * scale} />
              <Mail size={4 * scale} />
            </div>
          </div>
        </header>
      )}
      
      <main className="flex-grow p-1" style={{ padding: showText ? `${4 * scale}px` : '1px' }}>
        {showText && (
          <h2 className="font-bold mb-1" style={{ fontSize: `${5 * scale}px` }}>Projects</h2>
        )}
        <div className="grid grid-cols-3 gap-1" style={{ gap: showText ? `${4 * scale}px` : '1px' }}>
          {projects.map((project, index) => (
            <MiniProjectCard key={index} {...project} depth={depth} projects={projects} serverIndex={index.toString()} />
          ))}
          {depth < 2 && (
            <MiniProjectCard 
              title="Recursive App Preview" 
              imageUrl="/recursive-preview"
              useAppRender={true}
              useScreenshot={false}
              depth={depth}
              projects={projects}
              serverIndex="0"
            />
          )}
        </div>
      </main>
      
      {showText && (
        <footer className="bg-gray-900 text-white p-1" style={{ padding: `${4 * scale}px` }}>
          <div className="container mx-auto text-center">
            <p style={{ fontSize: `${4 * scale}px` }}>©Mithran Mohanraj {new Date().getFullYear()}</p>
          </div>
        </footer>
      )}
    </div>
  );
};

export default MiniAppPreview;