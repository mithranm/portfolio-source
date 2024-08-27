import React, { useState, useCallback, useMemo } from 'react';
import { X, ExternalLink, ChevronDown } from 'lucide-react';
import AppContent from './AppContent';
import '../styles/markdown.css';

const MAX_NESTING_LEVEL = 2;

const NestedProjectCard = ({ title, description, link, level = 0 }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = useCallback((e) => {
    if (level === 0) {
      e.preventDefault();
      e.stopPropagation();
      setIsExpanded(prev => !prev);
    }
  }, [level]);

  // Simplified scaling logic to reduce complexity
  const renderNestedPreview = useCallback(() => {
    if (level < MAX_NESTING_LEVEL) {
      const scale = isExpanded ? 0.7 : 0.4;
      return (
        <div className="relative w-full pb-[56.25%]">
          <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
            <div style={{ 
              transform: `scale(${scale})`, 
              transformOrigin: 'top left', 
              width: `${100 / scale}%`, 
              height: `${100 / scale}%`,
              transition: 'transform 0.3s ease-in-out' // Smooth transition for scaling
            }}>
              <AppContent isNested={true} nestedLevel={level + 1} />
            </div>
          </div>
        </div>
      );
    }
    return null;
  }, [level, isExpanded]);

  const cardContent = useMemo(() => (
    <>
      {renderNestedPreview()}
      <div className="p-4 flex flex-col flex-grow">
        <h2 className="text-xl font-semibold group-hover:text-blue-600 mb-2 truncate">
          {title}
        </h2>
        <div className="flex-grow overflow-hidden flex flex-col justify-between">
          <div className="text-gray-600 markdown-content line-clamp-1">
            <div text={description} />
          </div>
          {level === 0 && (
            <button
              onClick={toggleExpand}
              className="text-blue-500 hover:text-blue-700 flex items-center mt-2 self-start"
            >
              {isExpanded ? 'Collapse View' : 'Expand View'} 
              <ChevronDown className="ml-1" size={16} />
            </button>
          )}
        </div>
      </div>
      {level === 0 && (
        <div className="absolute bottom-2 right-2 text-gray-400 group-hover:text-blue-500 transition-colors duration-300">
          <ExternalLink size={20} />
        </div>
      )}
    </>
  ), [title, description, level, isExpanded, toggleExpand, renderNestedPreview]);

  const cardWrapper = useCallback((content) => {
    if (level === 0) {
      return (
        <div 
          className="group cursor-pointer" 
          onClick={toggleExpand}
        >
          <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 ease-in-out group-hover:scale-105 flex flex-col h-full relative">
            {content}
          </div>
        </div>
      );
    } else {
      return (
        <div 
          className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col h-full relative"
          onClick={(e) => e.stopPropagation()}
        >
          {content}
        </div>
      );
    }
  }, [level, toggleExpand]);

  const expandedContent = useMemo(() => (
    level === 0 && isExpanded && (
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
        onClick={(e) => e.stopPropagation()}
      >
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
            {renderNestedPreview()}
            <div className="text-gray-600 my-4 markdown-content">
              <div text={description} />
            </div>
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
    )
  ), [level, isExpanded, title, description, link, toggleExpand, renderNestedPreview]);

  return (
    <>
      {cardWrapper(cardContent)}
      {expandedContent}
    </>
  );
};

export default React.memo(NestedProjectCard);
