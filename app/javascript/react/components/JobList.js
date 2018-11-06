import React, { Component, Fragment } from 'react'
import JobTile from '../components/JobTile'
import styled from "styled-components"


const Container = styled.div`
  border: 3px solid lightgrey;
  width: 100%;
  height: 100%;
  margin: 10px;
`;

export default class JobList extends Component {
  render() {
    let jobCards = this.props.jobs.map((job) => {
      return(
          <JobTile
            jobName={job.name}
            notes={job.notes}
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
      )
    })
    return (
      <Fragment>
      {jobCards}
      </Fragment>
    )
  }
}
