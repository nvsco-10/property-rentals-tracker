import { useState, useEffect } from 'react'
import { useAppContext } from '../../context/appContext'
import { useNavigate } from 'react-router-dom'

// Components
import { 
  FormRow, 
  FormRowSelect, 
  FormRowSelectUsers, 
  FormRowSelectOwners, 
  Alert, 
  DeleteAlert 
} from '../../components'

// Styles
import Wrapper from '../../assets/wrappers/DashboardFormPage-Medium'

const AddRental = () => {
  const navigate = useNavigate();

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
    assigned,
    owner,
    handleChange,
    clearValues,
    createRental,
    getUsers,
    users,
    getOwners,
    owners,
    editRental,
    activeRental
  } = useAppContext()

  const [open, setOpen] = useState(false);

  useEffect(() => {
    getUsers()
    getOwners()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!streetAddress || !city|| !zipCode || !owner || !assigned) {
      displayAlert()
      return
    }

    if (zipCode.length < 5 || zipCode.length > 10) {
      displayAlert('Zip Code must be between 5 and 10 digits')
      return
    }

    if (isEditing) {
      const response = editRental()
   
      if (response) {
        setTimeout(() => {
          navigate(`/rentals/${activeRental._id}`)
        }, 2000)
      }
      return

    }
 
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
        <div className='addrental-header'>
          <h5>{isEditing ? 'edit rental' : 'add rental'}</h5>
          {isEditing && <span onClick={() => setOpen(true)} className='btn delete-btn'>delete</span> }
        </div>
        <DeleteAlert open={open} setOpen={setOpen} type='rental' />
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
            labelText='priority'
            value={priority}
            handleChange={handleRentalInput}
            list={priorityOptions}
          />
          {/* assigned */}
          <FormRowSelectUsers
            name='assigned'
            labelText='assigned'
            value={assigned}
            handleChange={handleRentalInput}
            list={users}
          />
          <FormRowSelectOwners
            name='owner'
            labelText='owner'
            value={owner}
            handleChange={handleRentalInput}
            list={owners}
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