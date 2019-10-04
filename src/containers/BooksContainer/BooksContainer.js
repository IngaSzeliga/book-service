import React from "react";
import Book from "../../components/Book";
import "./BooksContainer.scss";

const BooksContainer = props => {
  const { books } = props;

  return (
    <div className="books-main-container">
      <div className="books-container">
        {books.map(book => (
          <Book
            key={book.id}
            id={book.id}
            title={book.title}
            author={book.author}
            image={book.image}
          />
        ))}
      </div>
    </div>
  );
};

export default React.memo(BooksContainer);
