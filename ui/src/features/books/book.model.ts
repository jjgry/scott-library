export type Book = {
  id: string;
  tag: string;
  title: string;
  isbn: string;
  authors: string[];
  locations: string[];
  borrower: string | null;
  loanedAt: string | null;
};

export const newBook = (): Book => ({
  id: "",
  tag: "",
  title: "",
  isbn: "",
  authors: [],
  locations: [],
  borrower: null,
  loanedAt: null,
});
