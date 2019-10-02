import React, { PureComponent } from "react";
import axios from "axios";
import Dialog from "@material-ui/core/Dialog";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import "./BookDetails.scss";

class BookDetails extends PureComponent {
  state = { details: null };

  componentDidMount() {
    const { id } = this.props;
    axios(`api/books/${id}`).then(result => {
      const details = result.data.data;
      this.setState({ details });
    });
  }

  render() {
    const { isOpen, handleCloseDetails } = this.props;
    const { details } = this.state;

    if (details !== null) {
      const { title, author, description, image } = details;

      return (
        <Dialog
          onClose={handleCloseDetails}
          aria-labelledby="book-details-name"
          open={isOpen}
          className="book-details-container"
        >
          <div className="book-details-name-header">
            <Typography variant="h6">{`${author}: ${title}`}</Typography>
            <IconButton
              aria-label="close"
              onClick={handleCloseDetails}
              className="book-details-close-button"
            >
              <CloseIcon />
            </IconButton>
          </div>
          <div className="book-details-books-component">
            <img src={image} alt={title} className="book-details-image" />
            <Typography gutterBottom>{description}</Typography>
          </div>
        </Dialog>
      );
    } else {
      return null;
    }
  }
}

export default BookDetails;
