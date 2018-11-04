
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import AddIcon from "@material-ui/icons/Add";
import CustomerFormContainer from "../containers/CustomerFormContainer"

export default class CustomerFormDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
  };
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  
   
  render() {
    return (
      <div>
        <Button
            variant="fab"
            color="secondary"
            aria-label="Add"
            onClick={this.handleClickOpen}
          >
            <AddIcon />
            
          </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Your Customer</DialogTitle>
          <DialogContent>
        
          <CustomerFormContainer 
            customers={this.props.customers}
            addNewCustomer={this.props.addNewCustomer}
          />
           
          </DialogContent>
  
        </Dialog>
      </div>
    );
  }
}