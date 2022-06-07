import { useState, useEffect } from 'react'
import { FormRow, FormRowSelect, Alert, DeleteAlert } from '../../components'
import { useAppContext } from '../../context/appContext'
import Wrapper from '../../assets/wrappers/DashboardFormPage-Medium'

const AddOwner = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    handleChange,
    ownerName,
    ownerEmail,
    createOwner,
    clearValues,
    displayAlert
  } = useAppContext()

  // delete alert
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!ownerName || !ownerEmail) {
      displayAlert()
      return
    }
    
    if (isEditing) {
      return
    }
 
    createOwner()
  }
  const handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value

    handleChange({ name, value })
  }

  return (
    <Wrapper>
      <form className='form'>
        <div className='addrental-header'>
          <h4>{isEditing ? 'edit owner' : 'add owner'}</h4>
          {isEditing && <span onClick={() => setOpen(true)} className='btn delete-btn'>delete</span> }
        </div>
        <DeleteAlert open={open} setOpen={setOpen} type='owner' />
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* owner name*/}
          <FormRow
            type='text'
            labelText='name'
            name='ownerName'
            value={ownerName}
            handleChange={handleInput}
          /> 
          {/* owner name*/}
          <FormRow
            type='text'
            labelText='email'
            name='ownerEmail'
            value={ownerEmail}
            handleChange={handleInput}
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

export default AddOwner