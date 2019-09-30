import React, { PureComponent, Fragment } from "react";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAuthor from "../../containers/AddAuthor";
import AddBook from "../../containers/AddBook";
import "./NavBar.scss";

class NavBar extends PureComponent {
  state = { isBookOpen: false, isAuthorOpen: false, token: "" };

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

  handleLogin = () => {
    axios("api/token").then(result => this.setState({ token: result.data }));
  };

  handleLogout = () => {
    this.setState({ token: "" });
  };

  render() {
    const { isBookOpen, isAuthorOpen, token } = this.state;

    return (
      <div className="nav-bar-container">
        <AppBar position="static">
          <Toolbar className="toolbar-container">
            <Typography variant="h6"></Typography>

            {token !== "" ? (
              <Fragment>
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
                <Button color="inherit" onClick={this.handleLogout}>
                  Logout
                </Button>
              </Fragment>
            ) : (
              <Button color="inherit" onClick={this.handleLogin}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default NavBar;
