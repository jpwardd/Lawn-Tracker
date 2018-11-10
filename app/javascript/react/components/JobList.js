import React, { Component, Fragment } from 'react'
import JobTile from '../components/JobTile'


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
            lat={+job.customer.lat}
            lng={+job.customer.lng}
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
