import React, { Component } from 'react'


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
    this.handleClearForm = this.handleClearForm.bind(this)
  }

  handleChange(event) {
    let value = event.taget.value
    let name = event.taget.name
    this.setState({ [name]: value })
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
    console.log(this.props)
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>

        <h1 className="display-4">All contacts</h1>
        <hr /> 
      
        </form>
    </div>
  )
}
}

export default ContactFormContainer