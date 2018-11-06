import React, { Component, Fragment } from "react";
import TextInputField from "../components/TextInputField";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button";

import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import TimePicker from "material-ui-pickers/TimePicker";
import InlineDatePicker from "material-ui-pickers/DatePicker";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Select from "@material-ui/core/Select";
import Input from "@material-ui/core/Input"
import MenuItem from "@material-ui/core/MenuItem";


class JobFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      customerId: "",
      notes: "",
      selectedDate: new Date(),
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let formPayload = {
      name: this.state.name,
      customer_id: +this.state.customerId,
      notes: this.state.notes,
      job_date: this.state.selectedDate
    };
    this.props.addNewJob(formPayload);
    this.handleClearForm();
  }

  handleClearForm() {
    this.setState({
      name: "",
      notes: "",
      customerId: "",
      selectedDate: new Date()
    });
  }

  handleChange = name => event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleInputChange(event) {
    let value = event.target.value
    let name = event.target.name
    this.setState({ [name]: value})
  }

  handleSelectChange = event => {
    this.setState({ customerId: event.target.value });
  };

  
  render() {
    const { selectedDate } = this.state;
    let customerSelect = this.props.customers.map(customer => {
      return (
       <option key={customer.id} value={customer.id}>{customer.first_name} {customer.last_name}</option>
      );
    });
  
    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className="container" onSubmit={this.handleSubmit}>
          <TextField
            variant="standard"
            content={this.state.name}
            name="name"
            placeholder="Job name"
            value={this.state.name}
            onChange={this.handleInputChange}
            fullWidth
          />
          <TextField
            variant="standard"
            content={this.state.notes}
            name="notes"
            placeholder="notes"
            value={this.state.notes}
            onChange={this.handleInputChange}
            fullWidth
          />
    
         <select onChange={this.handleSelectChange} >

          <option selected="true" disabled="disabled">Choose A Customer</option>
          {customerSelect}
        </select>
         

          <InlineDatePicker
            label="add date"
            value={selectedDate}
            onChange={this.handleDateChange}
            fullWidth={true}
          />
        </form>
        <Button
          variant="contained"
          color="secondary"
          onClick={this.handleSubmit}
        >
          add job
        </Button>
      </MuiPickersUtilsProvider>
    );
  }
}

export default JobFormContainer;
