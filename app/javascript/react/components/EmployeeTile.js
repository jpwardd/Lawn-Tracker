import React, { Component, Fragment } from "react";
import ListItem from "@material-ui/core/ListItem";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import MoreIcon from "@material-ui/icons/MoreVert";
import IconButton from "@material-ui/core/IconButton";

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
      button = (
        <Button
          className="warning"
          variant="contained"
          onClick={this.editHandler}
        >
          edit
        </Button>
      );
    } else {
      button = (
        <Button
          className="success"
          type="submit"
          variant="contained"
          value="submit"
          onClick={this.handleSubmit}
        >
          save
        </Button>
      );
    }

      return (
        <div>
          <form className="customer-edit">
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
        </div>
      );
    }
  }
