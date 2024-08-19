import React from 'react';
import { AlertCircle } from 'lucide-react';
import useScreenshot from '../hooks/useScreenshot';

const ServerScreenshot = ({ serverIndex }) => {
  const { imageUrl, loading, error } = useScreenshot(serverIndex);

  if (loading) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100">
        <AlertCircle className="text-red-500 mb-2" size={24} />
        <p className="text-sm text-gray-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="screenshot-element w-full h-full">
      <img
        src={imageUrl}
        alt={`Screenshot of server ${serverIndex}`}
        className="w-full h-full object-cover"
      />
    </div>
  );
};

export default ServerScreenshot;