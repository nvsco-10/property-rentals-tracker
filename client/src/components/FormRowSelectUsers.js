const FormRowSelectUsers = ({ labelText, name, value, handleChange, list }) => {
  return (
    <div className='form-row'>
      <label htmlFor={name} className='form-label'>
        {labelText || name}
      </label>
      <select
        name={name}
        value={value}
        onChange={handleChange}
        className='form-select'
      >
        <option value=''>
            
        </option>
        {list.map((item, index) => {
          return (
            <option key={item._id} value={item._id}>
              {item.username}
            </option>
          )
        })}
      </select>
    </div>
  )
}

export default FormRowSelectUsers
