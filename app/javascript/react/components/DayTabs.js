import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import { Link } from "react-router";
import Button from "@material-ui/core/Button";
import JobFormDialog from "../components/JobFormDialog";
import AppBar from "@material-ui/core/AppBar";

const styles = {
  root: {
    flexGrow: 1
  }
};

class DayTabs extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;

    return (
      <div>
        <Paper className={classes.root}>
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            scrollable
          >
            <Tab onClick={() => {this.props.updateDay("Monday")}} label="Monday" />
            <Tab onClick={() => {this.props.updateDay("Tuesday")}} label="Tuesday" />
            <Tab onClick={() => {this.props.updateDay("Wednesday")}} label="Wednesday" />
            <Tab onClick={() => {this.props.updateDay("Thursday")}} label="Thursday" />
            <Tab onClick={() => {this.props.updateDay("Friday")}} label="Friday" />
            <Tab onClick={() => {this.props.updateDay("Saturday")}} label="Saturday" />
            <Tab onClick={() => {this.props.updateDay("Sunday")}} label="Sunday" />
          </Tabs>
        </Paper>
      </div>
    );
  }
}

DayTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(DayTabs);