import { Route, Routes } from "react-router-dom";
import { Books } from "./features/books/books";
import { LandingPage } from "./features/landing-page/landing-page";

export const AppRoutes = () => (
  <Routes>
    <Route index element={<LandingPage />} />
    <Route path="books" element={<Books />} />
  </Routes>
);
