import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import AddIcon from "@material-ui/icons/Add";
import JobFormContainer from "../containers/JobFormContainer";




export default class JobFormDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
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
        <Button variant="contained" color="secondary" onClick={this.handleClickOpen}>
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
            />
            
          </DialogContent>
        </Dialog>
      </div>
   
    );
  }
}
