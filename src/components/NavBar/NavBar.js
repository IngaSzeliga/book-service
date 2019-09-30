import React, { PureComponent } from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAuthor from "../../containers/AddAuthor";
import AddBook from "../../containers/AddBook";
import "./NavBar.scss";

class NavBar extends PureComponent {
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
      <div className="nav-bar-container">
        <AppBar position="static">
          <Toolbar className="toolbar-container">
            <Typography variant="h6"></Typography>
            <Button
              variant="contained"
              onClick={this.handleClickAuthorOpen}
              className="add-author-button"
            >
              Add author
            </Button>
            <AddAuthor
              isOpen={isAuthorOpen}
              handleClose={this.handleClickAuthorClose}
            />
            <Button
              variant="contained"
              onClick={this.handleClickBookOpen}
              className="add-book-button"
            >
              Add book
            </Button>
            <AddBook
              isOpen={isBookOpen}
              handleClose={this.handleClickBookClose}
            />
            <Button color="inherit">Login</Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
