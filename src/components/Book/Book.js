import React, { PureComponent, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import BookDetails from "../BookDetails";
import "./Book.scss";

class Book extends PureComponent {
  state = { isOpen: false };

  handleOpenDetails = () => {
    this.setState({ isOpen: true });
  };

  handleCloseDetails = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { title, author, image, id } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <Card className="book-container">
          <CardMedia className="book-image" image={image} title={title} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography gutterBottom variant="h6" component="h2">
              {author}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              className="book-button"
              onClick={this.handleOpenDetails}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
        {isOpen ? (
          <BookDetails
            id={id}
            isOpen={isOpen}
            handleCloseDetails={this.handleCloseDetails}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default Book;
