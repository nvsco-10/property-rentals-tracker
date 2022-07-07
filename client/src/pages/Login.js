import * as React from 'react'
import { useState, useEffect } from 'react'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'

// Components
import { Logo, FormRow, Alert, DemoButton } from '../components'
// Styles
import Wrapper from '../assets/wrappers/LoginPage'
// Utils
import demoUsers from '../utils/demoUsers'


const Login = () => {
  const navigate = useNavigate()
  const [ admin, bob, jane, alex ] = demoUsers
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();

  const initialState = {
    username: '',
    password: '',
  }
  
  const [formData, setformData] = useState(initialState)
  const [demo, setDemo] = useState(false)

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

  const loginDemoUser = (e) => {
    e.preventDefault()

    if(e.target.id === 'admin') {
      setupUser({currentUser: admin, endPoint: 'login', alertText: 'Logging in as Demo Admin! Redirecting...' })
    } 
    if(e.target.id === 'bob') {
      setupUser({currentUser: bob, endPoint: 'login', alertText: 'Logging in as Demo Bob! Redirecting...' })
    } 
    if(e.target.id === 'jane') {
      setupUser({currentUser: jane, endPoint: 'login', alertText: 'Logging in as Demo Jane! Redirecting...' })
    }
    if(e.target.id === 'alex') {
      setupUser({currentUser: alex, endPoint: 'login', alertText: 'Logging in as Demo Alex! Redirecting...' })
    }  

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
        <h5>{demo ? 'Login as Demo User' : 'Login'}</h5>
        {showAlert && <Alert />}

        { demo ? 
            <div className='demo-login'>
              {demoUsers.map(user => {
                return (
                <DemoButton 
                  key={user.id}
                  id={user.id}
                  name={user.name}
                  title={user.title}
                  handleClick={loginDemoUser}
                  icon={user.icon}
                />
                )
              })}
            </div>
          : 
            <>
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
            </>

        }

        <p className='toggle' onClick={() => setDemo(!demo)}>
          {demo ? 'Back to Login' : 'Login as demo user'}
        </p>

      </form>
    </Wrapper>
  )
}

export default Login