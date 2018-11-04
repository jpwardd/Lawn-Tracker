import React, { Component } from 'react'
import JobList from "../components/JobList"

import { DragDropContext } from 'react-beautiful-dnd';
import BottomNav from '../components/BottomNav';


export default class JobsContainer extends Component {
  constructor(props){
    super(props);
    this.state = {
      jobs: []
    }
    this.onDragEnd = this.onDragEnd.bind(this)
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

  onDragEnd(){

  }

  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
      <div>
    
  
        <JobList 
          jobs={this.state.jobs}
        />
      </div>
      <BottomNav 
      // this is to pass the state to make a new job
        jobs={this.state.jobs}

      />
      </DragDropContext>
    )
  }
}
