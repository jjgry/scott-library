import { useEffect, useState } from "react";
import { Book } from "./book.model";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);

  const clearBooks = () => {
    setBooks([]);
  };

  const getBooks = async (): Promise<Book[]> => {
    const response = await fetch("http://localhost:8080/books");
    return await response.json() as Book[];
  };

  useEffect(() => {
    const fetchData = async () => {
      setBooksLoading(true);
      getBooks()
        .then((response) => {
          setBooks(response);
        })
        .catch(() => {
          setBooks([]);
        })
        .finally(() => {
          setBooksLoading(false);
        });
    };

    fetchData();
  }, []);

  return {
    books,
    booksLoading,
    clearBooks,
  };
};
