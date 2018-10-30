import React, { Fragment } from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper"





const ContactTile = (props) => { 
  if (props.contactId != props.id) {
    return (
      <div>
        <Paper onClick={props.showFullContact}>
          <ListItem>
            {props.firstName} {props.lastName}
          </ListItem>
          {props.children}
        </Paper>
      </div>
    )
  } else {
    return(
      <div>
        <Paper  onClick={props.showFullContact}>
          <ListItem>
            {props.firstName} {props.lastName}
          </ListItem>
          
          <ListItem>
            {props.email}
          </ListItem>
          
          <ListItem>
            {props.address}
          </ListItem>
          
          <ListItem>
            {props.phoneNumber}
          </ListItem>
          
          <ListItem>
            {props.city}
          </ListItem>
          
          <ListItem>
            {props.state}
          </ListItem>
          
          <ListItem>
            {props.zip}
          </ListItem>
          <button>add to job list</button>
        </Paper>
      </div>
    )
  }
} 

export default ContactTile;
