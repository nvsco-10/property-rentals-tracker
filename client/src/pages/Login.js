import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/LoginPage'
import { useAppContext } from '../context/appContext'

const Login = () => {
  const initialState = {
    username: '',
    password: '',
  }
  const { isLoading, showAlert, displayAlert } = useAppContext();

  const [formData, setformData] = useState(initialState)

  const handleChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { email, password } = formData

    if( !email || !password ) {
      displayAlert()
      return
    }
    console.log(formData)
  }

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h3>Login</h3>
        {showAlert && <Alert />}

        {/* username input */}
        <FormRow 
          type='text' 
          name='username' 
          value={formData.username} 
          handleChange={handleChange}
        />

        {/* password input */}
        <FormRow 
          type='password' 
          name='password' 
          value={formData.password} 
          handleChange={handleChange}
        />

        <button type='submit' className='btn btn-block'>
          submit
        </button>
      </form>
    </Wrapper>
  )
}

export default Login