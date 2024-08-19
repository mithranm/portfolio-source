import { useState, useEffect, useCallback } from 'react';

// Move the cache outside of the hook to make it persist across re-renders and component unmounts
const cache = new Map();

const useScreenshot = (serverIndex) => {
  const [imageUrl, setImageUrl] = useState(() => cache.get(serverIndex) || '');
  const [loading, setLoading] = useState(!cache.has(serverIndex));
  const [error, setError] = useState(null);

  const fetchScreenshot = useCallback(() => {
    if (cache.has(serverIndex)) {
      setImageUrl(cache.get(serverIndex));
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    fetch("https://mithran.org/screenshot")
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (data.image) {
          const fullImageUrl = `https://mithran.org${data.image}`;
          setImageUrl(fullImageUrl);
          cache.set(serverIndex, fullImageUrl);
        } else {
          throw new Error('No image URL received');
        }
      })
      .catch(error => {
        console.error('Error fetching screenshot:', error);
        setError('Failed to load image');
      })
      .finally(() => {
        setLoading(false);
      });
  }, [serverIndex]);

  useEffect(() => {
    if (!cache.has(serverIndex)) {
      fetchScreenshot();
    }
  }, [fetchScreenshot, serverIndex]);

  return { imageUrl, loading, error };
};

export default useScreenshot;