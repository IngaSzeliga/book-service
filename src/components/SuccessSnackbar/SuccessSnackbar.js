import React from "react";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import SnackbarContent from "@material-ui/core/SnackbarContent";
import "./SuccessSnackbar.scss";

const SuccessSnackbar = props => {
  const { handleCloseSuccess } = props;

  return (
    <Snackbar
      className="snackbar-container"
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left"
      }}
      open
      autoHideDuration={6000}
      onClose={handleCloseSuccess}
    >
      <SnackbarContent
        className="snackbar-content"
        aria-describedby="client-snackbar"
        message={
          <span id="client-snackbar" className="success-message">
            <CheckCircleIcon />
            Saved successfully!
          </span>
        }
        action={[
          <IconButton
            className="success-icon"
            key="close"
            aria-label="close"
            color="inherit"
            onClick={handleCloseSuccess}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </Snackbar>
  );
};

export default React.memo(SuccessSnackbar);
