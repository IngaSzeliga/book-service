import React, { PureComponent } from "react";
import axios from "axios";
import Author from "../../components/Author";
import { numberOfItemPerPage } from "../../config/constants";
import PaginationBar from "../../components/PaginationBar";
import "./AuthorsContainer.scss";

class AuthorsContainer extends PureComponent {
  state = { authors: [] };

  componentDidMount() {
    axios(`api/authors?limit=${numberOfItemPerPage}`).then(result => {
      const authors = result.data;
      this.setState({ authors });
    });
  }

  changePage = offset => {
    axios(`api/authors?offset=${offset}&limit=${numberOfItemPerPage}`).then(
      result => {
        const authors = result.data;
        this.setState({ authors });
      }
    );
  };

  render() {
    const { authors } = this.state;

    return (
      <div className="authors-main-container">
        <div className="authors-container">
          {authors.map(author => (
            <Author
              key={author.id}
              id={author.id}
              name={author.name}
              image={author.image}
            />
          ))}
        </div>
        <PaginationBar changePage={this.changePage} />
      </div>
    );
  }
}

export default AuthorsContainer;
