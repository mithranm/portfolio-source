import { useState, useEffect, useCallback } from 'react';

const cache = new Map();
const serverIndexDictionary = {
  '1': 'https://mithran.org/screenshot'
};

const useScreenshot = (serverIndex) => {
  const [imageUrl, setImageUrl] = useState(() => cache.get(serverIndex) || '');
  const [loading, setLoading] = useState(!cache.has(serverIndex));
  const [error, setError] = useState(null);

  const fetchScreenshot = useCallback(() => {
    let isCurrent = true;
    setLoading(true);
    setError(null);
    fetch(serverIndexDictionary[serverIndex])
      .then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(data => {
        if (!data.image) {
          throw new Error('No image URL received');
        }
        return `https://mithran.org${data.image}`;
      })
      .then(fullImageUrl => {
        if (isCurrent) {
          setImageUrl(fullImageUrl);
          cache.set(serverIndex, fullImageUrl);
          setLoading(false);
        }
      })
      .catch(error => {
        console.error('Error fetching screenshot:', error);
        if (isCurrent) {
          setError('Failed to load image');
          setLoading(false);
          cache.delete(serverIndex);
        }
      });

    return () => {
      isCurrent = false;
    };
  }, [serverIndex]);

  useEffect(() => {
    if (!cache.has(serverIndex)) {
      const cleanup = fetchScreenshot();
      return cleanup;
    } else {
      setImageUrl(cache.get(serverIndex));
      setLoading(false);
    }
  }, [fetchScreenshot, serverIndex]);

  return { imageUrl, loading, error, refetch: fetchScreenshot };
};

export default useScreenshot;