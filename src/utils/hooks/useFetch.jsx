import { useEffect, useState } from "react";

export function useFetch(url) {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(url);

        if (!response.ok) throw new Error("Error fetching data");
        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    }

    fetchData();
  }, [url]);
  console.log(url)
  return { data, isLoading, error };
}
