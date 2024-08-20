import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { debounce } from 'lodash'; // Make sure to install lodash

const cache = new Map();

const useScreenshot = (serverIndex) => {
  const [imageUrl, setImageUrl] = useState(() => cache.get(serverIndex) || '');
  const [loading, setLoading] = useState(!cache.has(serverIndex));
  const [error, setError] = useState(null);
  const fetchingRef = useRef(false);

  const fetchScreenshot = useCallback(() => {
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    const url = serverIndex.startsWith('http') 
      ? serverIndex 
      : `https://mithran.org/screenshot?index=${serverIndex}`;

    fetch(url)
      .then(response => {
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        return response.json();
      })
      .then(data => {
        if (!data.image) throw new Error('No image URL received');
        const fullImageUrl = data.image.startsWith('http') ? data.image : `https://mithran.org${data.image}`;
        setImageUrl(fullImageUrl);
        cache.set(serverIndex, fullImageUrl);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching screenshot:', error);
        setError('Failed to load image');
        setLoading(false);
        cache.delete(serverIndex);
      })
      .finally(() => {
        fetchingRef.current = false;
      });
  }, [serverIndex]);

  const debouncedFetchScreenshot = useMemo(
    () => debounce(fetchScreenshot, 200),
    [fetchScreenshot]
  );

  useEffect(() => {
    if (!cache.has(serverIndex)) {
      debouncedFetchScreenshot();
    } else {
      setImageUrl(cache.get(serverIndex));
      setLoading(false);
    }

    return () => {
      debouncedFetchScreenshot.cancel();
    };
  }, [debouncedFetchScreenshot, serverIndex]);

  const refetch = useCallback(() => {
    cache.delete(serverIndex);
    fetchScreenshot();
  }, [serverIndex, fetchScreenshot]);

  return { imageUrl, loading, error, refetch };
};

export default useScreenshot;