import React, { Component, Fragment } from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"

import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import TimePicker from "material-ui-pickers/TimePicker";
import DatePicker from "material-ui-pickers/DatePicker";
import DateTimePicker from "material-ui-pickers/DateTimePicker";

import TextField from "@material-ui/core/TextField"


export default class ContactTile extends Component { 
  constructor(props) {
  super(props);
  this.state = {
    selectedDate: new Date(),
   
   
  }
  this.handleSubmit = this.handleSubmit.bind(this)
}

handleDateChange = (date) => {
    this.setState({ selectedDate: date });
  }

handleSelect(date){
  this.setState({ selectedDate: date })
}


  handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      customer_id: this.props.id,
      
      job_date: this.state.selectedDate
    };
    this.props.newJob(formPayload);
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
    return(
      <div>
        <Paper  onClick={this.props.showFullCustomer}>
          <ListItem>
            {this.props.firstName} {this.props.lastName}
          </ListItem>
          
          <ListItem>
            {this.props.email}
          </ListItem>
          
          <ListItem>
            {this.props.address}
          </ListItem>
          
          <ListItem>
            {this.props.phoneNumber}
          </ListItem>
          
          <ListItem>
            {this.props.city}
          </ListItem>
          
          <ListItem>
            {this.props.state}
          </ListItem>
          
          <ListItem>
            {this.props.zip}
          </ListItem>
        </Paper>
        <form>
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <DatePicker
            label="Job"
            value={selectedDate}
            onChange={this.handleDateChange}
            animateYearScrolling={false}
           
          />
        <Button onClick={this.handleSubmit}>add job</Button>
        </MuiPickersUtilsProvider>










        
        </form>
      </div>
    )
  }
  }
} 

