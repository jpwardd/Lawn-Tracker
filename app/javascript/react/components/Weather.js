import React, { Component } from 'react'

export default class Weather extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weather: []
    }
  }

  componentDidMount() {
    fetch("/api/v1/weather/?longitude=-71.058831&latitude=42.354046&units=auto")
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
        this.setState({ weather: data });
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }






  render() {
    return (
      <div>
        
      </div>
    )
  }
}
