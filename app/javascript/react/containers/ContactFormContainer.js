import React, { Component } from 'react'


class ContactFormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      contacts: []
    };
  }

  
  

  render() {
    return (
      <div className="container">
      <h1>All contacts</h1>
      <hr /> 
      
    </div>
  )
}
}

export default ContactFormContainer