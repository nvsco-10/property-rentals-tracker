import React from 'react'

const FormRow = ({ type, name, value, handleChange, labelText, readOnly }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <input 
        type={type}
        name={name}
        value={value}
        onChange={handleChange}
        className='form-input'
        disabled={readOnly}
      />
    </div>
  )
}

export default FormRow