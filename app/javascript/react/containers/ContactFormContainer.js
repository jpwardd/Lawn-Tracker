import React, { Component } from 'react'
import TextInputField from '../components/TextInputField'


class ContactFormContainer extends Component {
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

  handleChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value 
    });
  }

  handleSubmit(event){
    event.preventDefault();

    let formPayload = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      phone_number: +this.state.phoneNumber,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      zip_code: +this.state.zipCode
    }
    this.props.addNewContact(formPayload);
    this.handleClearForm();
  }

   handleClearForm(){
    this.setState({
      firstName: "",
      lastName: "",
      phoneNumber: "",
      email: "",
      address: "",
      city: "",
      state: "",
      zipCode: ""
    })
  }


  render() {
    return (
        <form className="container" onSubmit={this.handleSubmit}>
              <TextInputField 
                content={this.state.firstName}
                label="First Name"
                name="firstName"
                value={this.state.firstName}
                handleChange={this.handleChange}
              />
              <TextInputField 
                content={this.state.lastName}
                label="last Name"
                name="lastName"
                value={this.state.lastName}
                handleChange={this.handleChange}
              />
              <TextInputField 
                content={this.state.phoneNumber}
                label="phone number"
                name="phoneNumber"
                value={this.state.phoneNumber}
                handleChange={this.handleChange}
              />
              <TextInputField 
                content={this.state.email}
                label="email"
                name="email"
                value={this.state.email}
                handleChange={this.handleChange}
              />
              <TextInputField 
                content={this.state.address}
                label="address"
                name="address"
                value={this.state.address}
                handleChange={this.handleChange}
              />
              <TextInputField 
                content={this.state.city}
                label="city"
                name="city"
                value={this.state.city}
                handleChange={this.handleChange}
              />
              <TextInputField 
                content={this.state.state}
                label="state"
                name="state"
                value={this.state.state}
                handleChange={this.handleChange}
              />
              <TextInputField 
                content={this.state.zipCode}
                label="zip code"
                name="zipCode"
                value={this.state.zipCode}
                handleChange={this.handleChange}
              />
          
            <input className="btn btn-success mb-2" type="submit" value="Submit" />
        </form> 
    )
  }
}

export default ContactFormContainer