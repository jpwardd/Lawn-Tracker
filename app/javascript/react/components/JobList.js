import React, { Component, Fragment } from 'react'
import styled from 'styled-components'
import JobTile from '../components/JobTile'


const Container = styled.div`
  border: 3px solid lightgrey; 
  width: 100%;
  height: 100%;
  margin: 10px;
`;


export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      jobs: this.props.jobs
    }
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
  }

  
  
  render() {
    let jobs = this.state.jobs.map((job) => {
      return(
        <Fragment>
          <JobTile
            key={job.id}
            date={job.job_date}
            firstName={job.customer.first_name}
            lastName={job.customer.last_name}
            phoneNumber={job.customer.phone_number}
            address={job.customer.address}
            city={job.customer.city}
            state={job.customer.state}
            zipCode={job.customer.zip_code}
            notes={job.customer.notes}
          /> 
        </Fragment>
      )
    })
    return (
      <Fragment>
        {jobs}
        
      </Fragment>

    )

  }
}
