import React, { Component, Fragment } from "react";
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText"
import Typography from "@material-ui/core/Typography"
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";
import Grid from "@material-ui/core/Grid"

export default class EmployeeTile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.id,
      firstName: this.props.firstName,
      lastName: this.props.lastName,
      email: this.props.email,
      edit: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.editHandler = this.editHandler.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    let formPayload = {
      id: +this.state.id,
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      email: this.state.email,
    };
    this.props.editEmployeeHandler(formPayload);
    this.setState({
      edit: false
    });
  }

  editHandler(event) {
    event.preventDefault();
    this.setState({ edit: true });
  }

  handleChange(event) {
    let value = event.target.value;
    let name = event.target.name;
    this.setState({ [name]: value });
  }

  render() {

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

    let employeeWorkload = this.props.employeeJobs.map((job) => {
      return (
        <div key={job.id}>
          <List>
            <ListItem>
              <Typography variant="body2">
                customer: {job.customer.first_name} {job.customer.last_name}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                date: {job.presentable_job_date}
              </Typography>
            </ListItem>
            <ListItem>
              <Typography variant="body2">
                address: {job.customer.address}
              </Typography>
            </ListItem>
          </List>
        </div>
      )
    })

  if (this.props.employeeId != this.props.id) {
     return (
      <div>
        <Paper>
        <ListItem>
          <Button onClick={this.props.showFullEmployee}>
            {this.props.firstName} {this.props.lastName}
          </Button>
        </ListItem>
        </Paper>
      </div>
    )
  } else {
    return (
      <div>
       <Button color="primary" variant="contained" onClick={this.props.showFullEmployee}>
         done
        </Button>
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

        
            <label>Email</label>
            <input
              className={`customer-edit-input${className}`}
              label="Email"
              name="email"
              value={this.state.email}
              onChange={this.handleChange}
              disabled={!this.state.edit}
            />
            {button}
            <Button
              className="button alert"
              onClick={this.props.deleteEmployee}
              variant="contained"
              color="secondary"
            >
              Delete
            </Button>
          </form>
            {employeeWorkload}
        </div>
      );
      
    }
  }
}
