import React, { useState, useEffect, useCallback } from 'react';
import { AlertCircle } from 'lucide-react';
import { debounce } from 'lodash';

const ServerScreenshot = ({ serverIndex, width = 300, height = 200 }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScreenshot = useCallback(
    debounce(async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch("https://mithran.org/screenshot");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        if (data.image) {
          setImageUrl(`https://mithran.org${data.image}`);
        } else {
          throw new Error('No image URL received');
        }
      } catch (error) {
        console.error('Error fetching screenshot:', error);
        setError('Failed to load image');
      } finally {
        setLoading(false);
      }
    }, 1000),
    []
  );

  useEffect(() => {
    fetchScreenshot();
    return () => fetchScreenshot.cancel();
  }, [fetchScreenshot, serverIndex]);

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
        alt={`Screenshot of ${serverIndex}`}
        className="w-full h-full object-cover"
        onError={() => setError('Failed to load image')}
      />
    </div>
  );
};

export default ServerScreenshot;