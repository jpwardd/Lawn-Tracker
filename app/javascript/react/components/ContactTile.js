import React from 'react'


const ContactTile = (props) => {

  return(
    <div>
      <p>{props.firstName}</p>
      <p>{props.lastName}</p>
      <p>{props.phoneNumber}</p>
      <p>{props.email}</p>
      <p>{props.address}</p>
      <p>{props.city}</p>
      <p>{props.state}</p>
      <p>{props.zipCode}</p>
    </div>
  )
}

export default ContactTile;