import React, { Component } from 'react'
import ContactFormContainer from './ContactFormContainer'
import ContactTile from '../components/ContactTile'

class ContactIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      formToggle: true
    }
    this.formToggle = this.formToggle.bind(this)
  }

  componentDidMount() {
    fetch("/api/v1/contacts.json")
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
        console.log("response.status:", response.status);
        console.log("response.statusText:", response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ contacts: data });
        console.log("data", data);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewContact(formPayload) {
    fetch("/api/v1/contacts.json", {
      method: "post",
      body: JSON.stringify(formPayload)
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
       .then(response => response.json())
       .then(body => {
         console.log(body);
         this.setState({ contacts: [...this.state.contacts, body] })
       })
       .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  // form toggle handler
  formToggle() {
    this.setState({
      formToggle: !this.state.formToggle
    })
  }

  render() {
    let contacts = this.state.contacts.map((contact) => {
      return(
        <ContactTile 
          key={contact.id}
          id={contact.id}
          firstName={contact.first_name}
          lastName={contact.last_name}
          phoneNumber={contact.phone_number}
          email={contact.email}
          address={contact.address}
          city={contact.city}
          state={contact.state}
          zipCode={contact.zip_code}
        />
      )
    })
    return (
      <div>
      <h2>All Contacts</h2>
      <button className="btn btn-success mb-2" onClick={this.formToggle}>
        + add new contact
      </button>
        {!this.state.formToggle &&
        <ContactFormContainer 
          addNewContact={this.addNewContact}
        />}
        {contacts}
      </div>
    )
  }
}

export default ContactIndexContainer