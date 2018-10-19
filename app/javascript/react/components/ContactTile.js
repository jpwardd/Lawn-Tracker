import React from 'react'


const ContactTile = (props) => {
  return(
    <div className="container">
      <div className="row">
        <div className="col-sm">
        <ul className="list-group list-group-flush">
          
          <h6 className="text-white">first name:</h6>
            <li className="list-group-item">{props.firstName}</li>
          
          <h6 className="text-white">last name:</h6>
            <li className="list-group-item">{props.lastName}</li>
          
          <h6 className="text-dark">Phone:</h6>
            <li className="list-group-item">{props.phoneNumber}</li>
          
          <h6 className="text-dark">Email:</h6>
            <li className="list-group-item">{props.email}</li>
          
          <h6 className="text-dark">Address:</h6>
            <li className="list-group-item">{props.address}</li>
          
          <h6 className="text-dark">City:</h6>
            <li className="list-group-item">{props.city}</li>
          
          <h6 className="text-dark">state</h6>
            <li className="list-group-item">{props.state}</li>
          
          <h6 className="text-dark">Zip Code:</h6>
            <li className="list-group-item">{props.zipCode}</li>
        </ul>
        </div>
      </div>
    </div>
  )
}

export default ContactTile;