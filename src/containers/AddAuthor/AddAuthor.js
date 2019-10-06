import React from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
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

const useStyles = makeStyles(theme => ({
  appBar: {
    position: "relative"
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1
  }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const AddAuthor = props => {
  const { isOpen, handleClose } = props;
  const classes = useStyles();

  let name = "";
  let image = "";

  const handleNameInput = event => {
    name = event.target.value;
  };

  const handleImageInput = event => {
    image = event.target.value;
  };

  const handleSave = () => {
    const authorData = { name: name, image: image };
    const { token } = props;
    const config = {
      headers: { Authorization: token }
    };

    axios
      .post("api/authors", authorData, config)
      .then(response => {
        const { handleAuthorSave } = props;
        handleAuthorSave();
      })
      .catch(error => {
        const { handleOpenError } = props;
        if (error.response.status === 401) {
          const { handleLogout } = props;
          handleClose();
          handleLogout();
          handleOpenError("Your session has expired.");
        } else {
          handleOpenError("Something went wrong.");
        }
      });
  };

  return (
    <Dialog
      fullScreen
      open={isOpen}
      onClose={handleClose}
      TransitionComponent={Transition}
    >
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={handleClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Add new author
          </Typography>
          <Button color="inherit" onClick={handleSave}>
            save
          </Button>
        </Toolbar>
      </AppBar>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Name"
          type="text"
          fullWidth
          onChange={handleNameInput}
        />
        <TextField
          margin="dense"
          id="image"
          label="Image URL"
          type="text"
          fullWidth
          onChange={handleImageInput}
        />
      </DialogContent>
    </Dialog>
  );
};

export default React.memo(AddAuthor);
