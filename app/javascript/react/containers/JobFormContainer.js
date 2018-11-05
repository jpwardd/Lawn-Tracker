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


class CustomerFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      notes: "",
      selectedDate: new Date(),
      customers: []
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let formPayload = {
      name: this.state.name,
      notes: this.state.notes,
      selectedDate: this.state.selectedDate
    };
    this.props.addNewCustomer(formPayload);
    this.handleClearForm();
    console.log(formPayload);
  }

  handleClearForm() {
    this.setState({
      name: "",
      notes: "",
      selectedDate: new Date()
    });
  }

  handleChange = name => event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

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
        // console.log("response.status:", response.status);
        // console.log("response.statusText:", response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ customers: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDateChange = date => {
    this.setState({ selectedDate: date });
  };

  handleInputChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  handleSelectChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const { selectedDate } = this.state;
    let customerSelect = this.state.customers.map(customer => {
      return (
       <MenuItem key={customer.id} value={customer.first_name}>{customer.first_name} {customer.last_name}</MenuItem>
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
            onChange={this.handleInputChange("name")}
            fullWidth
          />
          <TextField
            variant="standard"
            content={this.state.notes}
            name="notes"
            placeholder="notes"
            value={this.state.notes}
            onChange={this.handleInputChange("name")}
            fullWidth
          />

          <Select
            value={this.state.customers}
            onChange={this.handleSelectChange}
            input={<Input name="customers" />}
            fullWidth={true}
          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
              {customerSelect}
          </Select>
         

          <InlineDatePicker
            onlyCalendar
            label="add date"
            value={selectedDate}
            onChange={this.handleDateChange}
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

export default CustomerFormContainer;
