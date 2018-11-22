import React, { Component, Fragment } from 'react'
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"
import Button from "@material-ui/core/Button"
import MoreIcon from "@material-ui/icons/MoreVert";
import GoogleMapReact from "google-map-react";
import IconButton from "@material-ui/core/IconButton"
import AddressSearchInput from "../components/AddressSearchInput"
import Typography from "@material-ui/core/Typography"
import styled from "styled-components"

const EditContainer = styled.div`
  padding: 8px;
`

export default class CustomerTile extends Component { 
  constructor(props) {
  super(props);
    this.state = {
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      phoneNumber: this.props.phoneNumber,
      email: this.props.email,
      address: this.props.address,
      city: this.props.city,
      state: this.props.state,
      zipCode: this.props.zipCode,
      notes: this.props.notes,
      edit: false
     
  
  }
   this.handleChange = this.handleChange.bind(this)
   this.handleSubmit = this.handleSubmit.bind(this)
   this.editHandler = this.editHandler.bind(this)
}

 
handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      id: +this.state.id,
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
    this.props.editCustomerHandler(formPayload);
    this.setState({
      edit: false
    })
  }

  editHandler(event){
    event.preventDefault()
    this.setState({ edit: true })
  }

   handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  }

  render() {
    const { selectedDate } = this.state;
  
    let className = "";
    if (this.state.edit) {
      className = " customer-edit-input-active";
    }
    
    let button;
    if (this.state.edit !== true) {
      button = <Button color="primary" variant="contained" onClick={this.editHandler}>edit</Button>
    } else {
      button = <Button className="success" type="submit" variant="contained" value="submit" onClick={this.handleSubmit} >save</Button>;
    }

      let center = {
        lat: this.props.lat,
        lng: this.props.lng
    }

    if (this.props.customerId != this.props.id) {
    return (
      <div>
        <Paper>
        <ListItem>
          <Button onClick={this.props.showFullCustomer}>
            {this.props.firstName} {this.props.lastName}
          </Button>
        </ListItem>
        </Paper>
      </div>
    )
  } else {
      return (
        <div>
          <Paper className="name">
          <Button color="secondary" variant="contained" onClick={this.props.showFullCustomer}>
            done
          </Button>
          <EditContainer>

            <form>
              <label>First Name</label>
              <input 
                className={`customer-edit-input${className}`}
                label="First Name"
                name="firstName" 
                value={this.state.firstName}  
                onChange={this.handleChange} 
                disabled={!this.state.edit}
                
              />
              <label>Last Name</label>
              <input 
               className={`customer-edit-input${className}`}
                label="Last Name"
                name="lastName" 
                value={this.state.lastName}  
                onChange={this.handleChange} 
                disabled={!this.state.edit}
                
              />

              <label>Phone Number</label>
              <input
                 className={`customer-edit-input${className}`}
                label="Phone Number"
                name="phoneNumber" 
                value={this.state.phoneNumber}  
                onChange={this.handleChange} 
                disabled={!this.state.edit}
                
              />
              <label>Email</label>
              <input 
               className={`customer-edit-input${className}`}
                label="Email"
                name="email" 
                value={this.state.email}  
                onChange={this.handleChange} 
                disabled={!this.state.edit}
                
              />
              <label>Address</label>
              <input 
               className={`customer-edit-input${className}`}
                label="Address"
                name="address" 
                value={this.state.address}  
                onChange={this.handleChange} 
                disabled={!this.state.edit}
                 
              />
             
          <div style={{ height: '30vh', width: '100%' }}>
              <GoogleMapReact
              bootstrapURLKeys={{ key:"AIzaSyA5YTh0MG0kmemXVlsl8VDbiHVUQaebWfU"}}
              center={center}
              zoom={16}
              >
              </GoogleMapReact>
          </div>
           
            {button}
            <Button className="button alert" onClick={this.props.deleteCustomer} variant="contained" color="secondary">
              Delete
            </Button>
            </form>
          </EditContainer>
          </Paper>
        </div>
      )
    }
  }
}

