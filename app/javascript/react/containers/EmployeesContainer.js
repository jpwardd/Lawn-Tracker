import React, { Component } from "react";
import List from "@material-ui/core/List";
import EmployeeTile from "../components/EmployeeTile";
import Typography from "@material-ui/core/Typography";
import BackButton from "../components/BackButton";
import styled from "styled-components";
import Card from "@material-ui/core/Card";
import Button from "@material-ui/core/Button";
import EmployeeFormDialog from "../components/EmployeeFormDialog";


const Container = styled.div`
  border: 2px solid lightgrey;
  border-radius: 20px;
  box-shadow: 3px 5px 7px #ccc;
  width: 75%;
  height: 100%;
  margin: 50px auto;
  padding: 20px;
  background-color: #739574;
`;

const FormDialog = styled.div`
  margin: auto;
  text-align: right;
`;

export default class EmployeesContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      employees: []
    };
    this.addNewEmployee = this.addNewEmployee.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.deleteEmployeeHandler = this.deleteEmployeeHandler.bind(this);
    this.editEmployeeHandler = this.editEmployeeHandler.bind(this);
    this.showFullEmployeeHandler = this.showFullEmployeeHandler.bind(this);
  }

  componentDidMount() {
    fetch("/api/v1/employees", {
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
      .then(response => {
        return response.json();
      })
      .then(data => {
        this.setState({ employees: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }



  addNewEmployee(formPayload) {
    fetch(`/api/v1/employees`, {
      method: "post",
      body: JSON.stringify(formPayload),
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
        let newCustomers = this.state.employees.concat(body);
        this.setState({ employees: newCustomers });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  handleDelete(id) {
    fetch(`/api/v1/employees/${id}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      credentials: "same-origin"
    })
      .then(response => {
        if (response.ok) {
          this.deleteEmployeeHandler(id);
        } else {
          let errorMessage = `${response.status} (${response.statusText})`,
            error = new Error(errorMessage);
          throw error;
        }
      })
      .catch(error => {
        console.error(`ERROR IN FETCH: ${error}`);
      });
  }

  deleteEmployeeHandler(id) {
    let updatedEmployeeList = this.state.employees.filter(
      employee => employee.id !== id
    );
    this.setState({
      employees: updatedEmployeeList
    });
  }

  editEmployeeHandler(formPayload) {
    fetch(`/api/v1/employees/${formPayload.id}`, {
      method: "PATCH",
      body: JSON.stringify(formPayload),
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
        let findEmployee = employee => {
          return employee.id === formPayload.id;
        };
        let employeeIndex = this.state.employees.findIndex(findEmployee);
        let newEmployees = this.state.employees;
        newEmployees.splice(employeeIndex, 1, body);

        this.setState({ employees: newEmployees });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

   showFullEmployeeHandler(id) {
    if (id === this.state.employeeId) {
      this.setState(state => ({ employeeId: null }));
    } else {
      this.setState(state => ({ employeeId: id }));
    }
  }


  render() {
    let employees = this.state.employees.map(employee => {
      let showFullEmployee = event => {
        this.showFullEmployeeHandler(employee.id)
      }

      let deleteEmployee = () => {
        this.handleDelete(employee.id);
      };

      return (
        <div key={employee.id}>
          <List>
            <EmployeeTile
              id={employee.id}
              firstName={employee.first_name}
              lastName={employee.last_name}
              email={employee.email}
              editEmployeeHandler={this.editEmployeeHandler}
              employeeId={this.state.employeeId}
              deleteEmployee={deleteEmployee}
              employeeJobs={employee.jobs}
              showFullEmployee={showFullEmployee}
            />
          </List>
        </div>
      );
    });

    return (
      <div>
        <BackButton />
        <Typography align="center" variant="h2" gutterBottom>
          Employees
        </Typography>
        <Container>
          <FormDialog>
            <EmployeeFormDialog
              employees={this.state.employees}
              addNewEmployee={this.addNewEmployee}
            />
          </FormDialog>
          {employees}
        </Container>
      </div>
    );
  }
}
