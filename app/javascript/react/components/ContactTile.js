import React from 'react'


const ContactTile = (props) => {

  return(
    <div className="mb-5 card mx-auto container bg-dark">
      <div className="card-body">
        <ul className="list-group list-group-flush">
          
          <h6 className="text-white">first name:</h6>
            <li className="list-group-item">{props.firstName}</li>
          
          <h6 className="text-white">last name:</h6>
            <li className="list-group-item">{props.lastName}</li>
          
          <h6 className="text-white">Phone:</h6>
            <li className="list-group-item">{props.phoneNumber}</li>
          
          <h6 className="text-white">Email:</h6>
            <li className="list-group-item">{props.email}</li>
          
          <h6 className="text-white">Address:</h6>
            <li className="list-group-item">{props.address}</li>
          
          <h6 className="text-white">City:</h6>
            <li className="list-group-item">{props.city}</li>
          
          <h6 className="text-white">state</h6>
            <li className="list-group-item">{props.state}</li>
          
          <h6 className="text-white">Zip Code:</h6>
            <li className="list-group-item">{props.zipCode}</li>
        </ul>
      </div>
    </div>
  )
}

export default ContactTile;