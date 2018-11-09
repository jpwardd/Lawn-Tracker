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
      jobs: this.props.jobs,
      
    }

  }

  render() {
    let filteredJobs = this.props.jobs.filter((job) => job.day_of_week === this.props.day)
    let jobCards = filteredJobs.map((job) => {

      let deleteJob = () => {
        this.props.handleDelete(job.id)
      }

      return(
        <div key={job.id}>
          <JobTile
            editJobHandler={this.props.editJobHandler}
            jobId={job.id}
            jobName={job.name}
            notes={job.notes}
            date={job.presentable_job_date}
            firstName={job.customer.first_name}
            lastName={job.customer.last_name}
            phoneNumber={job.customer.phone_number}
            address={job.customer.address}
            deleteJob={deleteJob}
          /> 
        </div>
      )
    })
    return (
      <Fragment>
      {jobCards}
      </Fragment>
    )
  }
}
