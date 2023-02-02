import { Link } from "react-router-dom";
import { books } from "../../demo-data";

export const Books = () => (
  <div className="books">
    <p>Books Page</p>
    <ul>
      {books.map((book) => (
        <li key={book.isbn}>
          <Link to={book.isbn}>{book.isbn}</Link>
        </li>
      ))}
    </ul>
  </div>
);
