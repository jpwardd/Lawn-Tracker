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
  }
};

class MenuAppBar extends React.Component {
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
          this.setState({ currentUser: data.user });
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

    return (
      <div className={classes.root}>
        <AppBar color="primary" position="static">
          <Toolbar>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              JOB LIST
            </Typography>
            <Link to="/weather"><Button variant="contained" color="secondary">Weather</Button></Link>
            <Button color="secondary" onClick={this.userSignOut}>Logout</Button>
          </Toolbar>
        </AppBar>
        {this.props.children}
      </div>
    );
  }
}

MenuAppBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MenuAppBar);
