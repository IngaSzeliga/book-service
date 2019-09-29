import React from "react";
import Button from "@material-ui/core/Button";
import "./Menu.scss";

const Menu = () => {
  return (
    <div className="menu-container">
      <Button variant="contained" className="button-book">
        Add Book
      </Button>
      <Button variant="contained" className="button-author">
        Add Author
      </Button>
    </div>
  );
};

export default Menu;
