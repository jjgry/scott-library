import { useCallback, useEffect, useState } from "react";
import { httpDelete, httpGet, httpPut } from "../../shared/util/http";
import { Book, newBook } from "./book.model";

export const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);

  const clearBooks = () => {
    setBooks([]);
  };

  const getBooks = async () => await httpGet<Book[]>("/books");

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

  const getBook = async (id: string) => await httpGet<Book>(`/books/${id}`);

  const updateBook = async (book: Book) => {
    await httpPut(`/books/${id}`, book);
    await fetchData();
  };

  const deleteBook = async () => {
    await httpDelete<Book>(`/books/${book.id}`);
    await fetchData();
  };

  const fetchData = useCallback(async () => {
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
  }, [id]);

  useEffect(() => {
    if (id) {
      fetchData();
    } else {
      clearBook();
    }
  }, [id, fetchData]);

  return {
    book,
    bookLoading,
    clearBook,
    updateBook,
    deleteBook,
  };
};
