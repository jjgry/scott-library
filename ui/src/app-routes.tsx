import { Route, Routes } from "react-router-dom";
import { Book } from "./features/books/book";
import { Books } from "./features/books/books";
import { LandingPage } from "./features/landing-page/landing-page";

export const AppRoutes = () => (
  <Routes>
    <Route index element={<LandingPage />} />
    <Route path="books" element={<Books />} />
    <Route path="books/:bookId" element={<Book />} /> 
  </Routes>
);
