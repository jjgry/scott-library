import { useEffect, useState } from "react";
import { Book, newBook } from "./book.model";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);

  const clearBooks = () => {
    setBooks([]);
  };

  const getBooks = async (): Promise<Book[]> => {
    const response = await fetch("http://localhost:8080/books");
    return (await response.json()) as Book[];
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

export const useBook = (id: string) => {
  const [book, setBook] = useState<Book>(newBook());
  const [bookLoading, setBookLoading] = useState(true);

  const clearBook = () => {
    setBook(newBook());
  };

  const getBook = async (id: string): Promise<Book> => {
    const response = await fetch(`http://localhost:8080/books/${id}`);
    return (await response.json()) as Book;
  };

  useEffect(() => {
    const fetchData = async () => {
      setBookLoading(true);
      getBook(id)
        .then((response) => {
          setBook(response);
        })
        .catch(() => {
          setBook(newBook());
        })
        .finally(() => {
          setBookLoading(false);
        });
    };

    if (id) {
      fetchData();
    } else {
      clearBook();
    }
  }, [id]);

  return {
    book,
    bookLoading,
    clearBook,
  };
};
