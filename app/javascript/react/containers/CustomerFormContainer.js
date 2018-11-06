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
      zipCode: "",
      notes: ""
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
      zip_code: this.state.zipCode,
      notes: this.state.notes
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
      zipCode: "",
      notes: ""
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
          variant="standard"
          placeholder="Phone Number"
          name="phoneNumber"
          value={this.state.phoneNumber}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          name="email"
          value={this.state.email}
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <TextField
          content={this.state.address}
          variant="standard"
          placeholder="address"
          name="address"
          value={this.state.address}
          onChange={this.handleChange}
          fullWidth
        />
        <TextField
          placeholder="city"
          name="city"
          value={this.state.city}
          onChange={this.handleChange}
          fullWidth
        />
        <TextField
          placeholder="state"
          name="state"
          value={this.state.state}
          onChange={this.handleChange}
          fullWidth
        />
        <TextField
          variant="standard"
          placeholder="zip code"
          name="zipCode"
          value={this.state.zipCode}
          onChange={this.handleChange}
          fullWidth
        />

        <Button
          variant="contained"
          color="secondary"
          type="submit"
          value="Submit"
        >
          Add Customer
        </Button>
      </form>
    );
  }
}

export default CustomerFormContainer;
