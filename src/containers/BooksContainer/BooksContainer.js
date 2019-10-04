import React, { PureComponent } from "react";
import axios from "axios";
import Book from "../../components/Book";
import { numberOfItemPerPage } from "../../config/constants";
import PaginationBar from "../../components/PaginationBar";
import "./BooksContainer.scss";

class BooksContainer extends PureComponent {
  state = { books: [] };

  componentDidMount() {
    axios(`api/books?limit=${numberOfItemPerPage}`).then(result => {
      const books = result.data;
      this.setState({ books });
    });
  }

  changePage = offset => {
    axios(`api/books?offset=${offset}&limit=${numberOfItemPerPage}`).then(
      result => {
        const books = result.data;
        this.setState({ books });
      }
    );
  };

  render() {
    const { books } = this.state;

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
        <PaginationBar changePage={this.changePage} />
      </div>
    );
  }
}

export default BooksContainer;
