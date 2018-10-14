import React from 'react'

const TextInputField = (props) => {
  return(
    <div>
    <label>{props.label}</label>
      <input 
        name={props.firstName}
        type="text"
        value={props.value}
        onChange={props.handleChange}
      />

    </div>
  )
}

export default TextInputField