import { useState, useEffect } from "react";
import { Book } from "components/organisms/book-list";

const useFetch = <T>(uri: string | undefined) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<T | null>(null);
  const [hasData, setHasData] = useState(false);
  const [error, setError] = useState<unknown>(null);
  const [hasError, setHasError] = useState(false);
  const [booksCount, setBooksCount] = useState(null);
  const [books, setBooks] = useState<Book[]>([]); // New state for storing books

  const fetchData = async () => {
    if (!uri) {
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(uri);
      if (!response.ok) {
        setHasError(true);
        return;
      }
      const data = await response.json();
      setData(data);
      setBooks(data.docs);
      setHasData(true);
      setBooksCount(data.numFound);
    } catch (err: unknown) {
      setHasError(true);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [uri]);

  return {
    loading,
    data,
    hasData,
    error,
    hasError,
    books,
    booksCount,
  };
};

export { useFetch };
