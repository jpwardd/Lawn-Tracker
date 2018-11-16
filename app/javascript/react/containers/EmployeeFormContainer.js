import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";


class EmployeeFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employeeId: "",
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

 
  handleSubmit(event) {
    event.preventDefault();

    let formPayload = {
      employee_id: +this.state.employeeId,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    };
    this.props.addNewEmployee(formPayload);
    console.log(formPayload)
    this.handleClearForm();
  }

  handleClearForm() {
    this.setState({
      firstName: "",
      lastName: "",
      email: "",
      password: ""
    });
  }

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  }

  render() {
    
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <TextField
          variant="standard"
          name="firstName"
          placeholder="first name"
          value={this.state.firstName}
          onChange={this.handleChange}
          fullWidth
        />

        {/* play around with the onChange handler to switch the name */}
        <TextField
          variant="standard"
          name="lastName"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.handleChange}
          fullWidth
        />
      
        <TextField
          name="email"
          value={this.state.email}
          placeholder="email"
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          name="password"
          value={this.state.password}
          placeholder="password"
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          value="Submit"
        >
          Add Employee
        </Button>
      </form>
    );
  }
}

export default EmployeeFormContainer;
