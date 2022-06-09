import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/LoginPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const initialState = {
    username: '',
    password: '',
  }
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();

  const [formData, setformData] = useState(initialState)

  const handleChange = (e) => {
    setformData({...formData, [e.target.name]: e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault()
    const { username, password } = formData

    if( !username || !password ) {
      displayAlert()
      return
    }

    const currentUser = { username, password }

    setupUser({currentUser, endPoint: 'login', alertText: 'Login Successful! Redirecting...' })

  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <Wrapper className='full-page'>
      <form className='form' onSubmit={onSubmit}>
        <Logo />
        <h5>Login</h5>
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

        <button type='submit' className='btn btn-block' disabled={isLoading}>
          submit
        </button>
      </form>
    </Wrapper>
  )
}

export default Login