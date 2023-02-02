import { useParams } from "react-router-dom";

export const Book = () => {
  const { bookId } = useParams();

  return (
    <div className="book">
      <p>Book {bookId} Page</p>
      <img
        src={`https://covers.openlibrary.org/b/isbn/${bookId}-M.jpg`}
        alt="Cover"
      />
    </div>
  );
};
