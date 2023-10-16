import { useState, useEffect } from "react";
import { fetchData } from "../api/axios";

const useCustomHook = (pageNumber, limit, checkScroller) => {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({});
  const [hasNextPage, setHasNextPage] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({});
    if (checkScroller === true) {
      fetchData(pageNumber, limit)
        .then((data) => {
          if (pageNumber < 1) {
            setResults([...data]);
            setIsLoading(false);
            return;
          } else {
            setResults([...data]);
            setIsLoading(false);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          setIsError(true);
          setError({ message: e.message });
        });
    } else {
      fetchData(pageNumber, limit)
        .then((data) => {
          if (pageNumber === 1) {
            setResults([...data]);
            setHasNextPage(Boolean(data.length));
            setIsLoading(false);
          } else {
            const pre = results.splice(results.length - limit);
            setResults([...pre, ...data]);
            setHasNextPage(Boolean(data.length));
            setIsLoading(false);
          }
        })
        .catch((e) => {
          setIsLoading(false);
          setIsError(true);
          setError({ message: e.message });
        });
    }
    return;
  }, [pageNumber]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useCustomHook;
