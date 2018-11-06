import React, { Component, Fragment } from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"

import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import TimePicker from "material-ui-pickers/TimePicker";
import DatePicker from "material-ui-pickers/DatePicker";
import DeleteIcon from "@material-ui/icons/Delete";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import Button from "@material-ui/core/Button"

import TextField from "@material-ui/core/TextField"


export default class CustomerTile extends Component { 
  constructor(props) {
  super(props);
    this.state = {
  
  }
  
}

  render() {
    const { selectedDate } = this.state;
  
    if (this.props.customerId != this.props.id) {
  
    return (
      <div>
        <Paper onClick={this.props.showFullCustomer}>
          <ListItem>
            {this.props.firstName} {this.props.lastName}
          </ListItem>
          {this.props.children}
        </Paper>
      </div>
    )
  } else {
      return (
        <div>
          <Paper onClick={this.props.showFullCustomer}>
            <ListItem>
              {this.props.firstName} {this.props.lastName}
            </ListItem>

            <ListItem>{this.props.phoneNumber}</ListItem>

            <ListItem>{this.props.email}</ListItem>

            <ListItem>{this.props.address}</ListItem>

            <ListItem>{this.props.city}</ListItem>
  
            <ListItem>{this.props.state}</ListItem>

            <ListItem>{this.props.zipCode}</ListItem>

            <Button onClick={this.props.deleteCustomer} variant="contained" color="secondary">
              Delete
              <DeleteIcon />
            </Button>
          </Paper>
        </div>
      )
    }
  }
}

