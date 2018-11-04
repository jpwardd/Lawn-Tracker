import React from "react";
import { browserHistory } from "react-router";
import Button from "@material-ui/core/Button"

const BackButton = () => {
  return (
    <div className="back-button">
      <Button variant="contained" color="secondary" onClick={browserHistory.goBack}>Back</Button>
    </div>
  );
};

export default BackButton;

