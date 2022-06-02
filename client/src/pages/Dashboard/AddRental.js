import { FormRow, FormRowSelect, Alert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage-Medium'

const AddRental = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    streetAddress,
    city,
    zipCode,
    priority,
    priorityOptions,
    status,
    statusOptions,
    handleChange,
    clearValues,
    createRental
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!streetAddress || !city|| !zipCode) {
      displayAlert()
      return
    }
    
    if (isEditing) {
      // editrental()
      return
    }
    // console.log('create rental')
    createRental()
  }
  const handleRentalInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <h3>{isEditing ? 'edit rental' : 'add rental'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* streetAddress */}
          <FormRow
            type='text'
            labelText='street address'
            name='streetAddress'
            value={streetAddress}
            handleChange={handleRentalInput}
          />
          {/* city */}
          <FormRow
            type='text'
            name='city'
            value={city}
            handleChange={handleRentalInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='zip code'
            name='zipCode'
            value={zipCode}
            handleChange={handleRentalInput}
          />
          {/* rental status */}
          <FormRowSelect
            name='status'
            value={status}
            handleChange={handleRentalInput}
            list={statusOptions}
          />
          {/* rental type */}
          <FormRowSelect
            name='priority'
            labelText='rental type'
            value={priority}
            handleChange={handleRentalInput}
            list={priorityOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              cancel
            </button>
          </div>
        </div>
      </form>
    </Wrapper>
  )
}

export default AddRental