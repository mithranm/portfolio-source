import { X, ExternalLink, ChevronDown } from 'lucide-react';
import React, { useState, useRef, useEffect } from 'react';
import DOMPurify from 'dompurify';
import ServerScreenshot from './ServerScreenshot';

const ProjectCard = ({ title, description, imageUrl, link, useScreenshot = false, isInMiniApp = false }) => {
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
    if (!isInMiniApp) {
      setIsExpanded(!isExpanded);
      document.body.style.overflow = !isExpanded ? 'hidden' : 'auto';
    }
  };

  const handleCardClick = (e) => {
    if (!isInMiniApp) {
      toggleExpand(e);
    }
  };

  const handleLinkClick = (e) => {
    e.stopPropagation();
  };

  const renderImage = (isExpandedView = false) => {
    if (useScreenshot) {
      const serverIndex = extractServerIndex(imageUrl);
      
      console.log('Rendering ServerScreenshot with Server Index:', serverIndex, 'Is Expanded View:', isExpandedView);
  
      return (
        <ServerScreenshot 
          key={`${serverIndex}-${isExpandedView ? 'expanded' : 'collapsed'}`} 
          serverIndex={serverIndex} 
          isExpandedView={isExpandedView}
        />
      );
    } else {
      return (
        <img
          src={imageUrl}
          alt={title}
          className={isExpandedView ? 'w-auto h-auto max-w-full max-h-[70vh] object-contain' : 'w-full h-full object-cover'}
        />
      );
    }
  };

  const extractServerIndex = (url) => {
    try {
      const urlObj = new URL(url, 'https://api.mithran.org');
      return urlObj.searchParams.get('index') || '1';
    } catch (error) {
      console.error('Invalid URL provided:', url);
      return null;
    }
  };

  const sanitizeAndRenderHTML = (content) => {
    const sanitizedContent = DOMPurify.sanitize(content);
    return { __html: sanitizedContent };
  };

  return (
    <div className="group cursor-pointer" onClick={handleCardClick}>
      <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 flex flex-col h-full relative">
        <div className="aspect-video overflow-hidden">
          {renderImage()}
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h2 className="text-xl font-semibold group-hover:text-blue-600 line-clamp-1">
            {title}
          </h2>
          <div className="flex-grow overflow-hidden">
            <div
              ref={descriptionRef}
              className="text-gray-600 line-clamp-1 markdown-content"
              dangerouslySetInnerHTML={sanitizeAndRenderHTML(description)}
            />
            {showReadMore && !isInMiniApp && (
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
        <div className="absolute bottom-2 right-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
          <a href={link} target="_blank" rel="noopener noreferrer" onClick={handleLinkClick}>
            <ExternalLink size={20} />
          </a>
        </div>
      </div>
      {isExpanded && !isInMiniApp && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl max-h-[90vh] overflow-auto">
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
              <div className="mb-4 flex items-center justify-center bg-gray-100">
                {renderImage(true)}
              </div>
              <div 
                className="text-gray-600 mb-4 markdown-content"
                dangerouslySetInnerHTML={sanitizeAndRenderHTML(description)}
              />
              <a
                href={link}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 inline-block"
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
              >
                Visit Project
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;