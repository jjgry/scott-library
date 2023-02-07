import { useEffect, useState } from "react";
import { books as staticBooks } from "../../demo-data";
import { Book } from "./book.model";

export type OpenLibraryBook = {
  bib_key?: string;
  info_url?: string;
  preview?: string;
  preview_url?: string;
  thumbnail_url?: string;
};

export type RichBook = Book & OpenLibraryBook;

type BooksResponse = {
  [bib_key: string]: OpenLibraryBook;
};

export const useBooks = () => {
  const [books, setBooks] = useState<RichBook[]>([]);
  const [booksLoading, setBooksLoading] = useState(true);

  const setEmptyBooks = () => {
    setBooks([]);
  };

  const clearBooks = () => {
    setBooks([]);
  };

  const getBooks = async (isbns: string[]) => {
    const bibKeys = isbns.map((isbn) => `ISBN:${isbn}`);
    const response = await fetch(
      `https://openlibrary.org/api/books?&bibkeys=${bibKeys.join(
        ","
      )}&format=json`,
      {
        method: "GET",
      }
    );
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      setBooksLoading(true);
      getBooks(staticBooks.map((item) => item.isbn))
        .then((response: BooksResponse) => {
          const openLibraryBooks = Object.values(response);
          const richBooks: RichBook[] = openLibraryBooks.map((book) => {
            const staticBook = staticBooks.filter(
              (s) => s.isbn === book.bib_key?.replace("ISBN:", "")
            )[0];
            return {
              ...book,
              ...staticBook,
            };
          });
          setBooks(richBooks);
        })
        .catch(() => {
          setBooks([]);
        })
        .finally(() => {
          setBooksLoading(false);
        });
    };

    if (staticBooks.length > 0) {
      fetchData();
    } else {
      setBooks([]);
    }
  }, []);

  return {
    books,
    booksLoading,
    setEmptyTables: setEmptyBooks,
    clearTables: clearBooks,
  };
};
