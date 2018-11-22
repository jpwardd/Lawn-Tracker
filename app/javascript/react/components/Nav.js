import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import Button from "@material-ui/core/Button"
import { Link } from "react-router"



const styles = {
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  },
  link: {
    color: "black"
  }
};

class Nav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: {}
    }
    this.userSignOut = this.userSignOut.bind(this)
  }

  componentDidMount() {
    fetch("/api/v1/users", {
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
      .then(data => {
        if (data) {
          this.setState({ currentUser: data });
        } else {
          this.setState({ currentUser: null });
        }
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  userSignOut(event) {
    fetch("/users/sign_out", {
      method: "DELETE",
      credentials: "same-origin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      }
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
      .then(response => {
        this.setState({ currentUser: null });
      
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    const { classes } = this.props;
     const children = React.Children.map(this.props.children, child => {
       return React.cloneElement(child, {
         currentUser: this.state.currentUser
       });
     });
    
    return (
      <div className={classes.root}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              <Link className={classes.link} to="/">LawnList</Link>
            </Typography>
            <Link className={classes.link} to="/weather"><Button color="inherit">Weather</Button></Link>
            <Link className={classes.link} to="/customers"><Button color="inherit">Customers</Button></Link>
            <Link className={classes.link} to="/employees"><Button color="inherit">Employees</Button></Link>
            <Button className={classes.link} onClick={this.userSignOut}>Logout</Button>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

Nav.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Nav);
