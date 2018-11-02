
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CustomerFormContainer from "../containers/CustomerFormContainer"

export default class FormDialog extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      open: false,
      customers: this.props.customers
  };
}

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
  

  
  addNewCustomer(formPayLoad) {
    fetch(`/api/v1/customers`, {
      method: "post",
      body: JSON.stringify(formPayLoad),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) {
          return response;
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .then(response => response.json())
      .then(body => {
      
        this.setState({ customers: [...this.props.customers, body] });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  render() {
    return (
      <div>
        <button className="success" onClick={this.handleClickOpen}>Add New Customer</button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Add Your Customer</DialogTitle>
          <DialogContent>
            
           <CustomerFormContainer 
              addNewCustomer={this.addNewCustomer}
            />
          </DialogContent>
  
        </Dialog>
      </div>
    );
  }
}