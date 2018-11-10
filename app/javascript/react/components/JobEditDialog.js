import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import JobEditFormContainer from "../containers/JobEditFormContainer";

export default class JobFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      customers: []
    };
  }

  componentDidMount() {
    fetch("/api/v1/customers.json")
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ customers: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { selectedDate } = this.state;
    return (
      <div>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleClickOpen}
          id={this.props.jobId}
        >
          edit
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Edit Job</DialogTitle>
          <DialogContent>
            <JobEditFormContainer
              jobId = {this.props.jobId}
              customers={this.state.customers}
              editJobHandler={this.props.editJobHandler}
            />
          </DialogContent>
        </Dialog>
      </div>
    );
  }
}
