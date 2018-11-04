import React, { Component, Fragment } from 'react'
import JobTile from '../components/JobTile'
import { Droppable } from "react-beautiful-dnd"


export default class JobList extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  
  
  render() {
    
    let jobs = this.props.jobs.map((job, index) => {
    
      return(
        <Droppable droppableId={job.id}>
        {(provided) => (
          <div ref={provided.innerRef}>
              <JobTile
                {...provided.droppableProps}
                index={index}
                key={job.customer.id}
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
            {provided.placeHolder}
          </div>
          )}
        </Droppable>
      )
    })
    return (
      <Fragment>
      {jobs}
      </Fragment>

    )

  }
}
