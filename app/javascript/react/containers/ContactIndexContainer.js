import React, { Component } from 'react'

class ContactIndexContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  componentDidMount() {
    fetch("/api/v1/contacts")
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
        console.log("response.status:", response.status);
        console.log("response.statusText:", response.statusText);
        return response.json();
      })
      .then(data => {
        this.setState({ contacts: data });
        console.log("data", data);
      })
      .catch(error => console.error(`Error in fetch: ${error.message}`));
  }

  render() {
    return (
      <div>hello</div>
    )
  }
}

export default ContactIndexContainer