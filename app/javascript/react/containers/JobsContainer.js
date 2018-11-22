import React, { Component, Fragment } from 'react'
import JobList from "../components/JobList"
import JobFormDialog from "../components/JobFormDialog";
import { Link } from "react-router";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import DayTabs from "../components/DayTabs"
import styled from "styled-components"
import BottomNav from '../components/BottomNav';
import Grid from "@material-ui/core/Grid"

const Container = styled.div`
  border: 2px solid #d7d9dd;
`;

export default class JobsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobs: [],
      employees: [],
      day: "Monday"
      
    }
    this.addNewJob = this.addNewJob.bind(this)
    this.deleteJobHandler = this.deleteJobHandler.bind(this)
    this.handleDelete = this.handleDelete.bind(this)
    this.editJobHandler = this.editJobHandler.bind(this)
    this.updateDay = this.updateDay.bind(this)
    this.fetchEmployees = this.fetchEmployees.bind(this)
  }
  
   componentDidMount() {
    fetch("/api/v1/jobs.json")
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
        this.setState({ jobs: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
      this.fetchEmployees()
  }

  fetchEmployees() {
    let employeeURL = `/api/v1/employees`;
    fetch(employeeURL)
    .then(response => {
      if (response.ok) {
        return response;
      } else {
        let errorMessage = `${response.status} (${response.statusText})`,
        error = new Error(errorMessage);
        throw(error);
      }
    })
    .then(response => response.json())
    .then(data => {
      this.setState({
        employees: data
      })
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
        this.setState({ jobs: [...this.state.jobs, body] });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }


  handleDelete(id){
		fetch(`/api/v1/jobs/${id}`,
		{
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json' } ,
			credentials: 'same-origin'
		})
		.then(response => {
			if (response.ok) {
        this.deleteJobHandler(id)
			}
			else {
				let errorMessage = `${response.status} (${response.statusText})`,
					error = new Error(errorMessage)
				throw error
			}
		})
		.catch(error => {
			console.error(`ERROR IN FETCH: ${error}`)
		})
  }
  
  deleteJobHandler(id){
    let updatedJobList = this.state.jobs.filter((job) => job.id !== id)
    this.setState({
      jobs: updatedJobList
    })
  }

  

  editJobHandler(formPayload) {
      fetch(`/api/v1/jobs/${formPayload.id}`, {
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
          let findJob = job => {
            return job.id === formPayload.id;            
          }
          let jobIndex = this.state.jobs.findIndex(findJob)
          let newJobs = this.state.jobs
          newJobs.splice(jobIndex, 1, body)
      
         this.setState({ jobs: newJobs })
        })
        .catch(error =>
          console.error(`Error in fetch: ${error.message}`)
        );
    }

    updateDay(weekday) {
      this.setState({ day: weekday})
    }
    
  render() {
 
    return (
      <div>
        <DayTabs 
        // this is to pass the state to make a new job
          jobs={this.state.jobs}
          addNewJob={this.addNewJob}
          updateDay={this.updateDay}

        />
    
         <JobFormDialog 
           jobs={this.props.jobs}
           employees={this.state.employees}
           addNewJob={this.addNewJob}
         />
        <Typography align="center" variant="h5">
            Lawn Dashboard
        </Typography>
        <JobList  
          editJobHandler={this.editJobHandler}
          handleDelete={this.handleDelete}
          jobs={this.state.jobs}
          day={this.state.day}
          
        />
      
     
      </div>
   
   
  

    )
  }
}
