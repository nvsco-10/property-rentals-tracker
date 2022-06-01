import { useState } from 'react'
import { useAppContext } from '../../context/appContext'
import { FormRow, Alert } from '../../components'
import Wrapper from '../../assets/wrappers/DashboardFormPage'

const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useAppContext()

  const [username, setUsername] = useState(user?.username || '')
  const [email] = useState(user?.email || '')
  const [firstName, setFirstName] = useState(user?.firstName || '')
  const [lastName, setLastName] = useState(user?.lastName || '')
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '')

  const handleSubmit = (e) => {
    e.preventDefault()

    if( !username || !firstName || !lastName || !phoneNumber ) {
      displayAlert()
      return
    }

    updateUser({ username, email, firstName, lastName, phoneNumber })
  }

  return (
    <Wrapper>
      <form className='form' onSubmit={handleSubmit}>
        <h3>profile</h3>
        {showAlert && <Alert/>}
        <div className='form-center'>
          <FormRow
            type='text'
            name='username'
            value={username}
            handleChange={(e) => setUsername(e.target.value)}
          />
          <FormRow
            type='text'
            name='email'
            value={user?.email}
            readOnly={true}
          />
          <FormRow
            type='text'
            labelText={'first name'}
            name='firstName'
            value={firstName}
            handleChange={(e) => setFirstName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText={'last name'}
            name='lastName'
            value={lastName}
            handleChange={(e) => setLastName(e.target.value)}
          />
          <FormRow
            type='text'
            labelText={'phone'}
            name='phoneNumber'
            value={phoneNumber}
            handleChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button className='btn btn-block' type='submit' disabled={isLoading}>
            {isLoading ? 'Please wait...' : 'save changes'}
          </button>
        </div>
      </form>
    </Wrapper>
  )
}

export default Profile