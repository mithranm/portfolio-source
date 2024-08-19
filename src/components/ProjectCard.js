import { X, ExternalLink, ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import ServerScreenshot from './ServerScreenshot';
import MiniAppPreview from './MiniAppPreview';

const ProjectCard = ({ title, description, imageUrl, link, useScreenshot = false, useAppRender = false, projects }) => {
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

  const renderImage = () => {
    if (useAppRender) {
      return <MiniAppPreview projects={projects} />;
    } else if (useScreenshot) {
      return <ServerScreenshot path={imageUrl} />;
    } else {
      return <img src={imageUrl} alt={title} className="absolute top-0 left-0 w-full h-full object-cover" />;
    }
  };

  return (
    <>
      <div className="group cursor-pointer" onClick={toggleExpand}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 flex flex-col h-full relative">
          <div className="relative pb-[56.25%]"> {/* This maintains a 4:3 aspect ratio */}
            <div className="absolute top-0 left-0 w-full h-full">
              {renderImage()}
            </div>
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
              <div className="w-full aspect-[4/3] mb-4">
                {renderImage()}
              </div>
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

export default ProjectCard;