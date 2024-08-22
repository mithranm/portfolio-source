// useScreenshot.js
import { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import { debounce } from 'lodash';

const cache = new Map();

const BASE_URL = process.env.NODE_ENV === 'development' 
  ? 'http://localhost:8080' 
  : 'https://api.mithran.org';

const useScreenshot = (serverIndex) => {
  const [imageUrl, setImageUrl] = useState(() => cache.get(serverIndex) || '');
  const [loading, setLoading] = useState(!cache.has(serverIndex));
  const [error, setError] = useState(null);
  const fetchingRef = useRef(false);

  const MAX_RETRIES = 3;
  const RETRY_DELAY = 5000;

  const fetchScreenshot = useCallback(() => {
    if (!serverIndex) {
      setError('Invalid server index');
      setLoading(false);
      return;
    }
  
    if (fetchingRef.current) return;
    fetchingRef.current = true;
    setLoading(true);
    setError(null);

    console.log('Fetching screenshot for server index:', serverIndex);
  
    fetch(`${BASE_URL}/health`)
      .then(response => response.json())
      .then(data => {
        if (data.status === 'OK') {
          const url = serverIndex.startsWith('http')
            ? serverIndex
            : `${BASE_URL}/screenshot?index=${encodeURIComponent(serverIndex)}`;

          const attemptFetch = (retryCount = 0) => {
            fetch(url)
              .then(response => {
                if (!response.ok) {
                  return response.json().then(errorData => {
                    throw new Error(`HTTP error! status: ${response.status}, message: ${errorData.error}, details: ${errorData.details}`);
                  });
                }
                return response.json();
              })
              .then(data => {
                if (!data.image) throw new Error('No image URL received');
                const fullImageUrl = data.image.startsWith('http') ? data.image : `${BASE_URL}${data.image}`;
                setImageUrl(fullImageUrl);
                cache.set(serverIndex, fullImageUrl);
                setLoading(false);
              })
              .catch(error => {
                console.error('Error fetching screenshot:', error);
                if (retryCount < MAX_RETRIES) {
                  console.log(`Retrying... (${retryCount + 1}/${MAX_RETRIES})`);
                  setTimeout(() => attemptFetch(retryCount + 1), RETRY_DELAY);
                } else {
                  setError('Failed to load image');
                  setLoading(false);
                  cache.delete(serverIndex);
                }
              })
              .finally(() => {
                fetchingRef.current = false;
              });
          };
  
          attemptFetch();
        } else {
          throw new Error('Server is not ready');
        }
      })
      .catch(error => {
        console.error('Error checking server health:', error);
        setError('Server is not ready');
        setLoading(false);
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
      console.log('Fetching screenshot for server index on mount:', serverIndex);
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
    console.log('Refetching screenshot for server index:', serverIndex);
    cache.delete(serverIndex);
    fetchScreenshot();
  }, [serverIndex, fetchScreenshot]);

  return { imageUrl, loading, error, refetch };
};

export default useScreenshot;
