import { useState, useEffect, useCallback } from 'react';

const useScreenshot = (serverIndex) => {
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchScreenshot = useCallback(() => {
    if (imageUrl) {
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
          setImageUrl(`https://mithran.org${data.image}`);
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
  }, [imageUrl]);

  useEffect(() => {
    fetchScreenshot();
  }, [fetchScreenshot, serverIndex]);

  return { imageUrl, loading, error };
};

export default useScreenshot;