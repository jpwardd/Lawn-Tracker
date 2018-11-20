import React, { Component, Fragment } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import DateFnsUtils from "material-ui-pickers/utils/date-fns-utils";
import MuiPickersUtilsProvider from "material-ui-pickers/MuiPickersUtilsProvider";
import InlineDatePicker from "material-ui-pickers/DatePicker";
import DateTimePicker from "material-ui-pickers/DateTimePicker";
import Input from "@material-ui/core/Input";
import NativeSelect from "@material-ui/core/NativeSelect";

class JobEditFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      customerId: "",
      employeeId: "",
      notes: "",
      employees: [],
      selectedDate: new Date()
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleCustomerSelectChange = this.handleCustomerSelectChange.bind(this);
    this.handleEmployeeSelectChange = this.handleEmployeeSelectChange.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/employees", {
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
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ employees: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      id: +event.target.id,
      employee_id: +this.state.employeeId,
      customer_id: +this.state.customerId,
      notes: this.state.notes,
      job_date: this.state.selectedDate
    };
    this.props.editJobHandler(formPayload);
    this.handleClearForm();
  }

  handleClearForm() {
    this.setState({
      notes: "",
      customerId: "",
      employeeId: "",
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
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  }

  handleCustomerSelectChange = event => {
    this.setState({ customerId: event.target.value });
  };

  handleEmployeeSelectChange = event => {
    this.setState({ employeeId: event.target.value });
  };

  render() {
    const { selectedDate } = this.state;
    let customerSelect = this.props.customers.map(customer => {
      return (
        <option key={customer.id} value={customer.id}>
          {customer.first_name} {customer.last_name}
        </option>
      );
    });

    let employeeSelect = this.state.employees.map(employee => {
      return (
        <option key={employee.id} value={employee.id}>
          {employee.first_name} {employee.last_name}
        </option>
      );
    });

    return (
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <form className="container" onSubmit={this.handleSubmit}>
          <NativeSelect onChange={this.handleCustomerSelectChange} fullWidth>
            <option disabled selected value>
              Choose a customer
            </option>
            {customerSelect}
          </NativeSelect>

          <NativeSelect onChange={this.handleEmployeeSelectChange} fullWidth>
            <option disabled selected value>
              Choose a employee
            </option>
            {employeeSelect}
          </NativeSelect>

          <TextField
            variant="standard"
            content={this.state.notes}
            name="notes"
            placeholder="notes"
            value={this.state.notes}
            onChange={this.handleInputChange}
            fullWidth
          />
          <InlineDatePicker
            label="add date"
            value={selectedDate}
            onChange={this.handleDateChange}
            fullWidth={true}
          />
        </form>
        <button id={this.props.jobId} onClick={this.handleSubmit}>
          add job
        </button>
      </MuiPickersUtilsProvider>
    );
  }
}

export default JobEditFormContainer;
