export type Book = {
  title?: string;
  authors?: string[];
  isbn: string;
  locations?: string[]
};

export type RichBook = {
  bib_key?: string;
  info_url?: string;
  preview?: string;
  preview_url?: string;
  thumbnail_url?: string;
};
