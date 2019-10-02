import React, { PureComponent } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "./AuthorDetails.scss";

class AuthorDetails extends PureComponent {
  state = { details: null };

  componentDidMount() {
    const { id } = this.props;
    axios(`api/authors/${id}`).then(result => {
      const details = result.data;
      this.setState({ details });
    });
  }

  render() {
    const { isOpen, handleCloseDetails } = this.props;
    const { details } = this.state;

    if (details !== null) {
      const { image, name, books } = details;

      return (
        <Dialog
          onClose={handleCloseDetails}
          aria-labelledby="author-details-name"
          open={isOpen}
          className="author-details-container"
        >
          <div className="author-details-name-header">
            <Avatar alt={name} src={image} className="author-avatar" />
            <Typography variant="h6">{name}</Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDetails}
              className="author-details-close-button"
            >
              <CloseIcon />
            </IconButton>
          </div>
          {books.length !== 0 ? (
            <div className="author-details-books-container">
              <div>
                <h2 className="books-header">Books:</h2>
              </div>
              <div className="author-details-books-component">
                {books.map(book => (
                  <div key={book.id}>
                    <div className="author-details-book">
                      <img
                        src={book.image}
                        alt={book.title}
                        className="author-details-book-image"
                      />
                    </div>
                    <Typography
                      gutterBottom
                      className="author-details-book-title"
                    >
                      {book.title}
                    </Typography>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div>
              <h4 className="books-header">No books to display</h4>
            </div>
          )}
        </Dialog>
      );
    } else {
      return null;
    }
  }
}

export default AuthorDetails;
