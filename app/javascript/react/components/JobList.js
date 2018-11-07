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
  constructor(props){
    super(props)
    this.state = {
      jobs: this.props.jobs
    }

  }

  



  render() {
    let jobCards = this.props.jobs.map((job) => {

      let deleteJob = () => {
        this.props.handleDelete(job.id)
      }

      return(
          <JobTile
            editJobHandler={this.props.editJobHandler}
            jobId={job.id}
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
            deleteJob={deleteJob}
            
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
