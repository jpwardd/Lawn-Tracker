import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import JobFormContainer from "../containers/JobFormContainer";


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
        <Button variant="contained" color="primary" onClick={this.handleClickOpen}>
         Add A Job
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Job Details</DialogTitle>
          <DialogContent>
            <JobFormContainer 
              addNewJob={this.props.addNewJob}
              customers={this.state.customers}
            />
            
          </DialogContent>
        </Dialog>
      </div>
   
    );
  }
}
