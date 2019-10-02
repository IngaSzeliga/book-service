import React, { PureComponent, Fragment } from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import AuthorDetails from "../AuthorDetails";
import "./Author.scss";

class Author extends PureComponent {
  state = { isOpen: false };

  handleOpenDetails = () => {
    this.setState({ isOpen: true });
  };

  handleCloseDetails = () => {
    this.setState({ isOpen: false });
  };

  render() {
    const { name, image, id } = this.props;
    const { isOpen } = this.state;
    return (
      <Fragment>
        <Card className="author-container">
          <CardMedia className="author-image" image={image} title={name} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {name}
            </Typography>
          </CardContent>
          <CardActions>
            <Button
              size="small"
              color="primary"
              className="author-button"
              onClick={this.handleOpenDetails}
            >
              Learn More
            </Button>
          </CardActions>
        </Card>
        {isOpen ? (
          <AuthorDetails
            id={id}
            isOpen={isOpen}
            handleCloseDetails={this.handleCloseDetails}
          />
        ) : null}
      </Fragment>
    );
  }
}

export default Author;
