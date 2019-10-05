import React from "react";
import Error from "@material-ui/icons/Error";
import "./ErrorPage.scss";

const ErrorPage = () => {
  return (
    <div className="error-page-main-container">
      <Error className="error-page-image" />
      <h1>Sorry! Something went wrong.</h1>
    </div>
  );
};

export default React.memo(ErrorPage);
