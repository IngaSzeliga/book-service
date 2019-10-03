import React, { PureComponent } from "react";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAuthor from "../AddAuthor";
import AddBook from "../AddBook";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import "./NavBar.scss";

class NavBar extends PureComponent {
  state = { isBookOpen: false, isAuthorOpen: false, token: "", error: "" };

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
    axios("api/token")
      .then(result => this.setState({ token: result.data }))
      .catch(error => {
        this.setState({ error: "Sorry, something went wrong" });
        console.error(error);
      });
  };

  handleLogout = () => {
    this.setState({ token: "" });
  };

  handleCloseError = () => {
    this.setState({ error: "" });
  };

  render() {
    const { isBookOpen, isAuthorOpen, token, error } = this.state;

    return (
      <div className="nav-bar-container">
        <AppBar position="static">
          <Toolbar className="toolbar-container">
            <Typography variant="h2">Book Service</Typography>

            {token !== "" ? (
              <div>
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
                  token={token}
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
              </div>
            ) : (
              <Button color="inherit" onClick={this.handleLogin}>
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
        {error !== "" ? (
          <ErrorSnackbar
            handleCloseError={this.handleCloseError}
            error={error}
          />
        ) : null}
      </div>
    );
  }
}

export default NavBar;
