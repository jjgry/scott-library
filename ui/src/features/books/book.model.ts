export type Book = {
  id: string;
  title: string;
  isbn: string;
  authors: string[];
  locations: string[];
};

export const newBook = (): Book => ({
  id: "",
  title: "",
  isbn: "",
  authors: [],
  locations: [],
});
