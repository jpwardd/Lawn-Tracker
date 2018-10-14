import React from 'react'


const ContactTile = (props) => {

  return(
    <div className="mb-3 card mx-auto">
      <div className="card-body bg-info">
      <ul className="list-group list-group-flush">
        <li className="list-group-item">{props.firstName}</li>
        <li className="list-group-item">{props.lastName}</li>
        <li className="list-group-item">{props.phoneNumber}</li>
        <li className="list-group-item">{props.email}</li>
        <li className="list-group-item">{props.address}</li>
        <li className="list-group-item">{props.city}</li>
        <li className="list-group-item">{props.state}</li>
        <li className="list-group-item">{props.zipCode}</li>
      </ul>
      </div>
    </div>
  )
}

export default ContactTile;