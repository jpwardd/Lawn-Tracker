import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button"
import AddressSearchInput from "../components/AddressSearchInput";
import PlacesAutocomplete, {geocodeByAddress, getLatLng} from "react-places-autocomplete";

class CustomerFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      geoLocation: {},
      notes: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClearForm = this.handleClearForm.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleGeoLocation = this.handleGeoLocation.bind(this);
    this.handleAddress = this.handleAddress.bind(this)
  }

  handleAddress(address) {
    this.setState({ address: address });
  }

  handleGeoLocation(latLng) {
    this.setState({ geoLocation: latLng });
  }

  handleSubmit(event) {
    event.preventDefault();

    let formPayload = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      notes: this.state.notes,
      lat: this.state.geoLocation.lat,
      lng: this.state.geoLocation.lng
    };
    this.props.addNewCustomer(formPayload);
    this.handleClearForm();
  }

  handleClearForm() {
    this.setState({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
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
          placeholder="email"
          onChange={this.handleChange}
          margin="normal"
          fullWidth
        />
        <AddressSearchInput 
          handleGeoLocation={this.handleGeoLocation}
          handleAddress={this.handleAddress}
          address = {this.state.address}
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
