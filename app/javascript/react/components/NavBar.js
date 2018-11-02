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
import MainContentContainer from "../containers/MainContentContainer";

import { DragDropContext, Droppable } from "react-beautiful-dnd"
import ContactTile from "../components/ContactTile";
import FormModal from "../components/FormModal"
import JobList from "../components/JobList";
import styled from "styled-components"

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

const Container = styled.div`
  border: 3px solid lightgrey;
  width: 100%;
  height: 100%;
  margin: 10px;
`;

class ResponsiveDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.innerRef = React.createRef()
    this.state = {
      mobileOpen: false,
      customers: [],
      jobs: [],
      customerId: null
    };
    this.addNewJob = this.addNewJob.bind(this);
    this.onDragEnd = this.onDragEnd.bind(this);
  }

  onDragEnd(result){
   
  }

  handleDrawerToggle = () => {
    this.setState(state => ({ mobileOpen: !state.mobileOpen }));
  };

  componentDidMount() {
    fetch(`/api/v1/customers.json`)
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
        this.setState({ customers: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  addNewJob(formPayLoad) {
    fetch(`/api/v1/jobs`, {
      method: "post",
      body: JSON.stringify(formPayLoad),
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
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
        
        this.setState({ jobs: [...this.state.jobs, data] });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  showFullCustomerHandler(id) {
    if (id === this.state.customerId) {
      this.setState(state => ({ customerId: null }));
    } else {
      this.setState(state => ({ customerId: id }));
    }
  }

  
  
  render() {
    const { classes, theme } = this.props;
    
    const customers = this.state.customers.map(customer => {
      let showFullCustomer = event => {
        this.showFullCustomerHandler(customer.id);
      };
      
      let newJob = formPayLoad => {
        this.addNewJob(formPayLoad);
      };
      
      
      return (
        <div>
          <List>
            <ContactTile
              key={customer.id}
              id={customer.id}
              firstName={customer.first_name}
              lastName={customer.last_name}
              phoneNumber={customer.phone_number}
              email={customer.email}
              address={customer.address}
              city={customer.city}
              state={customer.state}
              zipCode={customer.zip_code}
              showFullCustomer={showFullCustomer}
              customerId={this.state.customerId}
              newJob={newJob}
            />
          </List>
        </div>
      );
    });
    
    return (
    <DragDropContext onDragEnd={this.onDragEnd}>
      <div className={classes.root}>
        {this.props.children}
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
              {customers}
              <FormModal 
                addNewCustomer={this.state.customers}
              />
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
              {customers}
              <FormModal 
                addNewCustomer={this.state.cu}
              />
            </Drawer>
          </Hidden>
        </nav>
        <Container innerRef={this.innerRef}>
          <Droppable droppableId={this.state.customers.id}>
          {(provided) => (
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <JobList 
              innerRef={provided.innerRef}
              {...provided.droppableProps}
              jobs={this.state.jobs} 

            />
            {provided.placeholder}
          </main>
            )}
          </Droppable>
        </Container>
      </div>
        </DragDropContext>
    );
  }
}

ResponsiveDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  container: PropTypes.object,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(ResponsiveDrawer);
