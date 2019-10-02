import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Book.scss";

const Book = ({ title, author, image }) => {
  return (
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
        <Button size="small" color="primary" className="book-button">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(Book);
