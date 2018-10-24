import React from 'react'
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper
  }
});



const ContactTile = (props) => {
   const { classes } = props;
  return(
    <List component="nav">
      <ListItem>
        {props.firstName}
      </ListItem>
      <ListItem>
        {props.lastName}
      </ListItem>
      <ListItem>
        {props.phoneNumber}
      </ListItem>
      <ListItem>
        {props.email}
      </ListItem>
      <ListItem>
        {props.address}
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
{props.children}
    </List>
  
  )
}

export default ContactTile;