import React from "react";
import AddCircle from "@material-ui/icons/AddCircle";
import AccountCircle from "@material-ui/icons/AccountCircle";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import AddAuthor from "../../containers/AddAuthor";
import AddBook from "../../containers/AddBook";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import "./NavbarDrawer.scss";

const NavbarDrawer = props => {
  const {
    isMenuOpen,
    isBookOpen,
    isAuthorOpen,
    token,
    handleLogin,
    handleLogout,
    handleClickAuthorOpen,
    handleClickBookOpen,
    handleClickAuthorClose,
    handleClickBookClose,
    handleCloseMenu
  } = props;

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isMenuOpen}
      className="drawer-main-container"
    >
      <div className="close-drawer-button">
        <IconButton onClick={handleCloseMenu}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List className="drawer-list-container">
        {token !== "" ? (
          <div>
            <ListItem button key="Add author" onClick={handleClickAuthorOpen}>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Add author" />
            </ListItem>
            <AddAuthor
              isOpen={isAuthorOpen}
              handleClose={handleClickAuthorClose}
              token={token}
            />
            <ListItem button key="Add book" onClick={handleClickBookOpen}>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="Add book" />
            </ListItem>
            <AddBook
              isOpen={isBookOpen}
              handleClose={handleClickBookClose}
              token={token}
            />
            <Divider />
            <ListItem
              button
              key="Logout"
              className="logout-item"
              onClick={handleLogout}
            >
              <ListItemText primary="Logout" />
            </ListItem>
          </div>
        ) : (
          <List>
            <ListItem button key="Login" onClick={handleLogin}>
              <ListItemIcon>
                <AccountCircle />
              </ListItemIcon>
              <ListItemText primary="Login" />
            </ListItem>
          </List>
        )}
      </List>
      <Divider />
    </Drawer>
  );
};

export default React.memo(NavbarDrawer);
