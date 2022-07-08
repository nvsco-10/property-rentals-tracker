import React from 'react'
import { Link } from 'react-router-dom'

const Error = ({ img, type, heading, message }) => {
  return (
    <div>
      <img src={img} alt={type} />
      <h3>{heading}</h3>
      <p>{message}</p>
      <Link to='/'>back home</Link>
    </div>
  )
}

export default Error