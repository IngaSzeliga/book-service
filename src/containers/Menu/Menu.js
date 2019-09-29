import React, { PureComponent } from "react";
import Button from "@material-ui/core/Button";
import AddAuthor from "../../containers/AddAuthor";
import AddBook from "../../containers/AddBook";
import "./Menu.scss";

class Menu extends PureComponent {
  state = { isBookOpen: false, isAuthorOpen: false };

  handleClickBookOpen = () => {
    this.setState({ isBookOpen: true });
  };

  handleClickBookClose = () => {
    this.setState({ isBookOpen: false });
  };

  handleClickAuthorOpen = () => {
    this.setState({ isAuthorOpen: true });
  };

  handleClickAuthorClose = () => {
    this.setState({ isAuthorOpen: false });
  };

  render() {
    const { isBookOpen, isAuthorOpen } = this.state;
    return (
      <div className="menu-container">
        <Button
          variant="contained"
          className="button-book"
          onClick={this.handleClickBookOpen}
        >
          Add Book
        </Button>
        <AddBook isOpen={isBookOpen} handleClose={this.handleClickBookClose} />
        <Button
          variant="contained"
          className="button-author"
          onClick={this.handleClickAuthorOpen}
        >
          Add Author
        </Button>
        <AddAuthor
          isOpen={isAuthorOpen}
          handleClose={this.handleClickAuthorClose}
        />
      </div>
    );
  }
}

export default Menu;
