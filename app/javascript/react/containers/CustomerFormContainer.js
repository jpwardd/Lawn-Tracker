import React, { Component } from "react";
import TextInputField from "../components/TextInputField";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import List from "@material-ui/core/List";
import Button from "@material-ui/core/Button"

class CustomerFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();

    let formPayload = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip_code: this.state.zipCode
    };
    this.props.addNewCustomer(formPayload);
    this.handleClearForm();
    console.log(formPayload);
  }

  handleClearForm() {
    this.setState({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    });
  }

  handleChange = name => event => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <form className="container" onSubmit={this.handleSubmit}>
        <TextField
          variant="standard"
          content={this.state.firstName}
          name="firstName"
          placeholder="first name"
          value={this.state.firstName}
          onChange={this.handleChange("name")}
          fullWidth
        />
        <TextField
          variant="standard"
          content={this.state.lastName}
          name="lastName"
          placeholder="Last Name"
          value={this.state.lastName}
          onChange={this.handleChange("name")}
          fullWidth
        />
        <TextField
          content={this.state.phoneNumber}
          variant="standard"
          placeholder="Phone Number"
          name="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.handleChange("name")}
          margin="normal"
          fullWidth
        />
        <TextField
          content={this.state.email}
          variant="standard"
          placeholder="email"
          name="email"
          value={this.state.email}
          onChange={this.handleChange("name")}
          margin="normal"
          fullWidth
        />
        <TextField
          content={this.state.address}
          variant="standard"
          placeholder="address"
          name="address"
          value={this.state.address}
          onChange={this.handleChange("name")}
          fullWidth
        />
        <TextField
          content={this.state.city}
          variant="standard"
          placeholder="city"
          name="city"
          value={this.state.city}
          onChange={this.handleChange("name")}
          fullWidth
        />
        <TextField
          content={this.state.state}
          variant="standard"
          placeholder="state"
          name="state"
          value={this.state.state}
          onChange={this.handleChange("name")}
          fullWidth
        />
        <TextField
          content={this.state.zipCode}
          variant="standard"
          placeholder="zip code"
          name="zipCode"
          value={this.state.zipCode}
          onChange={this.handleChange("name")}
          fullWidth
        />

        <Button variant="contained" color="secondary" type="submit" value="Submit">
          Add Customer
        </Button>
      </form>
    );
  }
}

export default CustomerFormContainer;
