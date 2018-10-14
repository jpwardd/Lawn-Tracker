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

    }
    this.handleChange = this.handleChange.bind(this)
    this.handleClearForm = this.handleClearForm.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
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

  render() {
    return (
        <form className="container" onSubmit={this.handleSubmit}>
            <h2>All Contacts</h2>
              <TextInputField 
                label="First Name"
                name="firstName"
                value={this.state.firstName}
                handleChange={this.handleChange}
              />
              
              <TextInputField 
                label="last Name"
                name="lastName"
                value={this.state.lastName}
                handleChange={this.handleChange}
              />
              <TextInputField 
                label="email"
                name="email"
                value={this.state.email}
                handleChange={this.handleChange}
              />
              <TextInputField 
                label="address"
                name="address"
                value={this.state.address}
                handleChange={this.handleChange}
              />
              <TextInputField 
                label="city"
                name="city"
                value={this.state.lastName}
                handleChange={this.handleChange}
              />
              <TextInputField 
                label="state"
                name="zipCode"
                value={this.state.lastName}
                handleChange={this.handleChange}
              />
        </form>
  
  )
}
}

export default ContactFormContainer