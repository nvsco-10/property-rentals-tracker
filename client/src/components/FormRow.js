const FormRow = ({ type, name, value, handleChange, labelText, readOnly, maxLength }) => {
  const currentLength = value?.length
  const max = maxLength + 1;

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
      {maxLength && 
      <div className='count-row'>
        <p className={currentLength < max ? 'warning' : 'warning danger'}>
          {currentLength} / {maxLength}
          <span className={currentLength < max ? '' : 'active'}>
            {labelText || name} length has been exceeded!
          </span>
        </p>
      </div>
      }
    </div>
  )
}

export default FormRow