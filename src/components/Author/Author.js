import React from "react";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import "./Author.scss";

const Author = ({ name, image }) => {
  return (
    <Card className="author-container">
      <CardMedia className="author-image" image={image} title={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="h2">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" color="primary" className="author-button">
          Learn More
        </Button>
      </CardActions>
    </Card>
  );
};

export default React.memo(Author);
