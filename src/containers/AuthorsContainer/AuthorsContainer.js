import React, { PureComponent } from "react";
import axios from "axios";
import Author from "../../components/Author";
import "./AuthorsContainer.scss";

class AuthorsContainer extends PureComponent {
  state = { authors: [] };

  componentDidMount() {
    axios("api/authors?limit=6").then(result => {
      const authors = result.data;
      this.setState({ authors });
    });
  }

  render() {
    const { authors } = this.state;

    return (
      <div className="authors-main-container">
        <div className="authors-container">
          {authors.map(author => (
            <Author key={author.id} name={author.name} image={author.image} />
          ))}
        </div>
      </div>
    );
  }
}

export default AuthorsContainer;
