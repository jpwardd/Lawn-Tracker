import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import Hidden from "@material-ui/core/Hidden";
import Divider from "@material-ui/core/Divider";
import MenuIcon from "@material-ui/icons/Menu";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import InboxIcon from "@material-ui/icons/MoveToInbox";
import MailIcon from "@material-ui/icons/Mail";
import MainContentContainer from "../containers/MainContentContainer"

import ContactTile from '../components/ContactTile'

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0
    }
  },
  appBar: {
    marginLeft: drawerWidth,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3
  }
});


class ResponsiveDrawer extends React.Component {
  state = {
    mobileOpen: false,
    contacts: [],
    contactId: null
  };

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

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
        // console.log("response.status:", response.status);
        // console.log("response.statusText:", response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ contacts: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  showFullContactHandler(id){
    if(id === this.state.contactId){
      this.setState(state => ({ contactId: null }));      
    }else{
      this.setState(state => ({ contactId: id }))
    }
  }

  render() {
    const { classes, theme } = this.props;
    
    const contacts = this.state.contacts.map((contact) => {
      let showFullContact = (event) => {
          this.showFullContactHandler(contact.id);
      };
      return (
        <div>
          <List>
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
              showFullContact={showFullContact}
              contactId={this.state.contactId}
            />
          </List>
        </div>
      );
    });

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar position="fixed" className={classes.appBar} color="default">
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerToggle}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap>
              Job List
            </Typography>
          </Toolbar>
        </AppBar>
        <nav className={classes.drawer}>
          
          <Hidden smUp implementation="css">
            <Drawer
              container={this.props.container}
              variant="temporary"
              anchor={theme.direction === "rtl" ? "right" : "left"}
              open={this.state.mobileOpen}
              onClose={this.handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper
              }}
              ModalProps={{
                keepMounted: true
              }}
            >
              {contacts}
            </Drawer>
          </Hidden>
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper
              }}
              variant="permanent"
              open
            >
              {contacts}
            </Drawer>
          </Hidden>
        </nav>
        {this.props.children}
      </div>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
