// ServerScreenshot.js
import React, { useState, useEffect } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import useScreenshot from '../hooks/useScreenshot';

const ServerScreenshot = ({ serverIndex, isExpandedView }) => {
  console.log('ServerScreenshot Rendered with index:', serverIndex, 'Is Expanded View:', isExpandedView);
  
  const { imageUrl, loading, error, refetch } = useScreenshot(serverIndex);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (isExpandedView) {
      console.log('Expanded view triggered, refetching image...');
      refetch();  // Force refetch when the view is expanded
    }
  }, [isExpandedView, refetch]);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleRetry = () => {
    setImgError(false);
    refetch();
  };

  if (loading) {
    console.log('Loading screenshot for server index:', serverIndex);
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || imgError) {
    console.error('Error loading screenshot for server index:', serverIndex, error);
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
        <AlertCircle className="text-red-500 mb-2" size={24} />
        <p className="text-sm text-gray-600 mb-2">{error || 'Failed to load image'}</p>
        <button
          onClick={handleRetry}
          className="flex items-center text-blue-500 hover:text-blue-700"
        >
          <RefreshCw size={16} className="mr-1" />
          Retry
        </button>
      </div>
    );
  }

  console.log('Image URL:', imageUrl);
  
  return (
    <div className="aspect-video relative" style={{ display: 'block', width: '100%', height: 'auto', backgroundColor: '#f00' }}>
      <img
        src={imageUrl}
        alt={`Screenshot of server ${serverIndex}`}
        style={{ visibility: 'visible', width: '100%', height: 'auto', backgroundColor: '#0f0' }}
        className="absolute inset-0 w-full h-full object-cover"
        onError={handleImageError}
      />
    </div>
  );
  
};

export default ServerScreenshot;