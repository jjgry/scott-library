import { useEffect, useState } from "react";

export type RichBook = {
  bib_key?: string;
  info_url?: string;
  preview?: string;
  preview_url?: string;
  thumbnail_url?: string;
};

const newBook = () => ({
  bib_key: "",
  info_url: "",
  preview: "",
  preview_url: "",
  thumbnail_url: "",
});

type BooksResponse = {
  [bib_key: string]: RichBook;
};

export const useBook = (isbn: string) => {
  const [book, setBook] = useState<RichBook>(newBook());
  const [bookLoading, setBookLoading] = useState(true);

  const clearBook = () => {
    setBook(newBook());
  };

  const getBook = async (isbn: string) => {
    const response = await fetch(
      `https://openlibrary.org/api/books?&bibkeys=${isbn}&format=json`,
      {
        method: "GET",
      }
    );
    return response.json();
  };

  useEffect(() => {
    const fetchData = async () => {
      setBookLoading(true);
      getBook(isbn)
        .then((response: BooksResponse) => {
          const x = Object.values(response);
          setBook(x[0]);
        })
        .catch(() => {
          clearBook();
        })
        .finally(() => {
          setBookLoading(false);
        });
    };

    fetchData();
  }, [isbn]);

  return { book, bookLoading, clearBook };
};
