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
import "./AddBook.scss";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

class AddBook extends PureComponent {
  constructor(props) {
    super(props);
    this.title = "";
    this.author = "";
    this.description = "";
    this.image = "";
  }
  state = {
    titleError: "",
    authorError: "",
    descriptionError: "",
    imageError: ""
  };

  handleTitleInput = event => {
    this.title = event.target.value;
  };

  handleAuthorInput = event => {
    this.author = event.target.value;
  };

  handleDescriptionInput = event => {
    this.description = event.target.value;
  };

  handleImageInput = event => {
    this.image = event.target.value;
  };

  handleSave = () => {
    const bookData = {
      title: this.title,
      author: this.author,
      description: this.description,
      image: this.image
    };
    const { token } = this.props;
    const config = {
      headers: { Authorization: token }
    };

    const stateError = {
      titleError: "",
      authorError: "",
      descriptionError: "",
      imageError: ""
    };
    let hasError = false;

    if (this.title === "") {
      stateError.titleError = errorMessage;
      hasError = true;
    }
    if (this.author === "") {
      stateError.authorError = errorMessage;
      hasError = true;
    }
    if (this.description === "") {
      stateError.descriptionError = errorMessage;
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
        .post("api/books", bookData, config)
        .then(response => {
          const { handleBookSave } = this.props;
          handleBookSave();
        })
        .catch(error => {
          const { handleOpenError } = this.props;
          if (error.response.status === 401) {
            const { handleLogout, handleClose } = this.props;
            handleClose();
            handleLogout();
            handleOpenError("Your session has expired.");
          } else if (error.response.status === 400) {
            this.setState({
              titleError: "",
              authorError: "Author doesn't exist.",
              descriptionError: "",
              imageError: ""
            });
          } else {
            handleOpenError("Something went wrong.");
          }
        });
    }
  };
  render() {
    const { isOpen, handleClose } = this.props;
    const {
      titleError,
      authorError,
      descriptionError,
      imageError
    } = this.state;

    return (
      <Dialog
        fullScreen
        open={isOpen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar>
          <Toolbar className="add-book-header-container">
            <div className="add-book-close-and-title">
              <IconButton
                edge="start"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <CloseIcon />
              </IconButton>
              <Typography variant="h6" className="add-book-header">
                Add new book
              </Typography>
            </div>

            <Button color="inherit" onClick={this.handleSave}>
              save
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent className="add-book-input-container">
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Title"
            type="text"
            error={titleError !== ""}
            helperText={titleError}
            fullWidth
            onChange={this.handleTitleInput}
            className="title-input"
          />
          <TextField
            margin="dense"
            id="name"
            label="Author"
            type="text"
            error={authorError !== ""}
            helperText={authorError}
            fullWidth
            onChange={this.handleAuthorInput}
          />
          <TextField
            id="standard-multiline-static"
            label="Description"
            multiline
            rows="4"
            margin="normal"
            error={descriptionError !== ""}
            helperText={descriptionError}
            fullWidth
            onChange={this.handleDescriptionInput}
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

export default AddBook;
