import React, { PureComponent } from "react";
import axios from "axios";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import TextField from "@material-ui/core/TextField";
import DialogContent from "@material-ui/core/DialogContent";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import CloseIcon from "@material-ui/icons/Close";
import Slide from "@material-ui/core/Slide";
import { errorMessage } from "../../config/constants";
import "./AddAuthor.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AddAuthor extends PureComponent {
  constructor(props) {
    super(props);
    this.name = "";
    this.image = "";
  }

  state = {
    nameError: "",
    imageError: ""
  };

  handleNameInput = event => {
    this.name = event.target.value;
  };

  handleImageInput = event => {
    this.image = event.target.value;
  };

  handleSave = () => {
    const authorData = { name: this.name, image: this.image };
    const { token } = this.props;
    const config = {
      headers: { Authorization: token }
    };

    const stateError = {
      nameError: "",
      imageError: ""
    };

    let hasError = false;

    if (this.name === "") {
      stateError.nameError = errorMessage;
      hasError = true;
    }
    if (this.image === "") {
      stateError.imageError = errorMessage;
      hasError = true;
    }
    if (hasError) {
      this.setState(stateError);
    } else {
      axios
        .post("api/authors", authorData, config)
        .then(response => {
          const { handleAuthorSave } = this.props;
          handleAuthorSave();
        })
        .catch(error => {
          const { handleOpenError } = this.props;
          if (error.response.status === 401) {
            const { handleLogout, handleClose } = this.props;
            handleClose();
            handleLogout();
            handleOpenError("Your session has expired.");
          } else {
            handleOpenError("Something went wrong.");
          }
        });
    }
  };
  render() {
    const { isOpen, handleClose } = this.props;
    const { nameError, imageError } = this.state;

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar className="add-author-header-container">
            <div className="add-author-close-and-title">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="add-author-header">
                Add new author
              </Typography>
            </div>
            <Button color="inherit" onClick={this.handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="add-author-input-container">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            error={nameError !== ""}
            helperText={nameError}
            fullWidth
            onChange={this.handleNameInput}
            className="name-input"
          />
          <TextField
            margin="dense"
            id="image"
            label="Image URL"
            type="text"
            error={imageError !== ""}
            helperText={imageError}
            fullWidth
            onChange={this.handleImageInput}
          />
        </DialogContent>
      </Dialog>
    );
  }
}

export default AddAuthor;
