import React, { useState } from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';
import useScreenshot from '../hooks/useScreenshot';

const ServerScreenshot = React.memo(({ serverIndex }) => {
  const { imageUrl, loading, error, refetch } = useScreenshot(serverIndex);
  const [imgError, setImgError] = useState(false);

  const handleImageError = () => {
    setImgError(true);
  };

  const handleRetry = () => {
    setImgError(false);
    refetch();
  };

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error || imgError) {
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

  return (
    <div className="screenshot-element w-full h-full">
      <img
        src={imageUrl}
        alt={`Screenshot of server ${serverIndex}`}
        className="w-full h-full object-cover"
        onError={handleImageError}
      />
    </div>
  );
});

export default ServerScreenshot;