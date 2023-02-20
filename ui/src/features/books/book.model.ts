export type Book = {
  id: string;
  title: string;
  isbn: string;
  authors: string[];
  locations: string[];
  borrower: string | null;
  loanedAt: string | null;
};

export const newBook = (): Book => ({
  id: "",
  title: "",
  isbn: "",
  authors: [],
  locations: [],
  borrower: null,
  loanedAt: null,
});
