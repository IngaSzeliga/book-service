import React, { PureComponent } from "react";
import axios from "axios";
import Book from "../../components/Book";
import "./BooksContainer.scss";

class BooksContainer extends PureComponent {
  state = { books: [] };

  componentDidMount() {
    axios("api/books?limit=6").then(result => {
      const books = result.data;
      this.setState({ books });
    });
  }

  render() {
    const { books } = this.state;

    return (
      <div className="books-main-container">
        <div className="books-container">
          {books.map(book => (
            <Book
              key={book.id}
              title={book.title}
              author={book.author}
              image={book.image}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default BooksContainer;
