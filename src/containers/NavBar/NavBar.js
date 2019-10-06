import React, { PureComponent } from "react";
import axios from "axios";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import AddAuthor from "../AddAuthor";
import AddBook from "../AddBook";
import ErrorSnackbar from "../../components/ErrorSnackbar";
import SuccessSnackbar from "../../components/SuccessSnackbar/SuccessSnackbar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import NavbarDrawer from "../../components/NavbarDrawer";
import "./NavBar.scss";

class NavBar extends PureComponent {
  state = {
    isBookOpen: false,
    isAuthorOpen: false,
    isMenuOpen: false,
    token: "",
    error: "",
    isSuccess: false
  };

  handleClickBookOpen = () => {
    this.setState({ isBookOpen: true });
  };

  handleClickBookClose = () => {
    this.setState({ isBookOpen: false });
  };

  handleBookSave = () => {
    this.setState({ isSuccess: true, isBookOpen: false });
  };

  handleAuthorSave = () => {
    this.setState({ isSuccess: true, isAuthorOpen: false });
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
      });
  };

  handleLogout = () => {
    this.setState({ token: "" });
  };

  handleOpenError = error => {
    this.setState({ error, isSuccess: false });
  };

  handleCloseError = () => {
    this.setState({ error: "" });
  };

  handleCloseSuccess = () => {
    this.setState({ isSuccess: false });
  };

  handleOpenMenu = () => {
    this.setState({ isMenuOpen: true });
  };

  handleCloseMenu = () => {
    this.setState({ isMenuOpen: false });
  };

  render() {
    const {
      isBookOpen,
      isAuthorOpen,
      isMenuOpen,
      token,
      error,
      isSuccess
    } = this.state;

    return (
      <div className="nav-bar-container">
        <AppBar position="fixed">
          <Toolbar className="toolbar-container">
            <IconButton
              edge="start"
              className="hamburger-menu"
              color="inherit"
              aria-label="menu"
              onClick={this.handleOpenMenu}
            >
              <MenuIcon />
            </IconButton>
            {isMenuOpen === true ? (
              <NavbarDrawer
                isMenuOpen={isMenuOpen}
                isBookOpen={isBookOpen}
                isAuthorOpen={isAuthorOpen}
                token={token}
                handleLogin={this.handleLogin}
                handleLogout={this.handleLogout}
                handleClickAuthorOpen={this.handleClickAuthorOpen}
                handleClickBookOpen={this.handleClickBookOpen}
                handleClickAuthorClose={this.handleClickAuthorClose}
                handleClickBookClose={this.handleClickBookClose}
                handleCloseMenu={this.handleCloseMenu}
              />
            ) : null}

            <Typography variant="h2" className="navbar-title">
              Book Service
            </Typography>

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
                  handleAuthorSave={this.handleAuthorSave}
                  handleOpenError={this.handleOpenError}
                  handleLogout={this.handleLogout}
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
                  handleBookSave={this.handleBookSave}
                  handleOpenError={this.handleOpenError}
                  handleLogout={this.handleLogout}
                  token={token}
                />
                <Button
                  color="inherit"
                  onClick={this.handleLogout}
                  className="navbar-logout-button"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                color="inherit"
                onClick={this.handleLogin}
                className="navbar-login-button"
              >
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
        {isSuccess ? (
          <SuccessSnackbar handleCloseSuccess={this.handleCloseSuccess} />
        ) : null}
      </div>
    );
  }
}

export default NavBar;
