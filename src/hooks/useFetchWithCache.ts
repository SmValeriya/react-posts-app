import { useState, useEffect } from 'react';

export function useFetchWithCache<T>(cacheKey: string, url: string) {
  const [data, setData] = useState<T | null>(() => {
    try {
      const cachedData = localStorage.getItem(cacheKey);
      return cachedData ? JSON.parse(cachedData) : null;
    } catch {
      return null;
    }
  });

  const [loading, setLoading] = useState<boolean>(!data);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (data) {
      setLoading(false);
      return;
    }

    let ignore = false;
    setLoading(true);
    setError(null);

    const fetchData = async () => {
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

        const result = await response.json();

        if (!ignore) {
          localStorage.setItem(cacheKey, JSON.stringify(result));
          setData(result);
        }
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message);
        else setError("An unknown error occurred");
      } finally {
        if (!ignore) setLoading(false);
      }
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [cacheKey, url]);

  return { data, loading, error };
}