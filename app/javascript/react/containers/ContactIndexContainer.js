import React, { Component } from 'react'
import ContactFormContainer from './ContactFormContainer'
import ContactTile from '../components/ContactTile'
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField"
import BottomNav from "../components/BottomNav"
import GridListTile from "@material-ui/core/GridListTile";
import { withStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import InboxIcon from '@material-ui/icons/Inbox';
import DraftsIcon from '@material-ui/icons/Drafts';



class ContactIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: [],
      formToggle: true,
      contactToggle: true
    }
    this.formToggle = this.formToggle.bind(this)
    this.addNewContact = this.addNewContact.bind(this)

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
      credentials: "same-origin",
      method: "post",
      body: JSON.stringify(formPayload),
      headers: { "Content-Type": "application/json" }
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
        this.setState({ contacts: this.state.contacts.concat(body) });
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
      let contactChange = () => {
        this.contactToggle
      }
      return (
        <div>
          <List component="nav">
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
                contactChange={contactChange}
              />
          </List>
        </div>
      )
    })
    return (
      <div>
      <Button variant="contained" color="primary" onClick={this.formToggle}>
        add new contact
      </Button>
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