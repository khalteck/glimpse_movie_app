import { useEffect, useState } from "react";

interface FetchResult {
  results?: any[];
}

interface IProps {
  fetchFunction: () => Promise<any>;
  autoFetch?: boolean;
}

const useFetch = ({
  fetchFunction,
  autoFetch = true,
}: IProps): {
  data: any[] | any | null;
  loading: boolean;
  error: Error | null;
  reFetch: () => Promise<any[] | undefined>;
  reset: () => void;
} => {
  const [data, setData] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchFunction();

      setData(response?.results || response || []);
      return response?.results || response || [];
    } catch (error) {
      setError(
        error instanceof Error ? error : new Error("An error occurred!")
      );
    } finally {
      setLoading(false);
    }
  };

  const reset = () => {
    setData(null);
    setError(null);
    setLoading(false);
  };

  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, []);

  return { data, loading, error, reFetch: fetchData, reset };
};

export default useFetch;
