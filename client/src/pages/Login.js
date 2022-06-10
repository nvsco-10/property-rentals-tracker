import { useState, useEffect } from 'react'
import { Logo, FormRow, Alert } from '../components'
import Wrapper from '../assets/wrappers/LoginPage'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
import { FaUserTie, FaUser } from 'react-icons/fa'
import demoUsers from '../utils/demoUsers'

import * as React from 'react';
import Tooltip from '@mui/material/Tooltip';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';

const Login = () => {
  const navigate = useNavigate()
  const { admin, bob, jane, alex } = demoUsers

  const initialState = {
    username: '',
    password: '',
  }
  const { user, isLoading, showAlert, displayAlert, setupUser } = useAppContext();

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
          (
            <div className='demo-login'>

              <Tooltip title="Never at the office" placement="top">
                <button id='admin' className='account' onClick={loginDemoUser} >
                  <FaUserTie  className='icon'  />
                  Demo Admin
                </button>
              </Tooltip>
              
              <Tooltip title="Bob hates his job" placement="top">
                <button id='bob' className='account'  onClick={loginDemoUser}>
                  <FaUser className='icon' />
                  Demo User Bob
                </button>
              </Tooltip>

              <Tooltip title="Jane hates Bob" placement="top">
                <button id='jane' className='account'  onClick={loginDemoUser} >
                  <FaUser className='icon' />
                  Demo User Jane
                </button>
              </Tooltip>

              <Tooltip title="Alex is suffering from Imposter Syndrome" placement="top">
                <button id='alex' className='account' onClick={loginDemoUser} >
                  <FaUser className='icon' />
                  Demo User Alex
                </button>
              </Tooltip>

            </div>
          ) 
          : 
          (
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
          )
        }

        <p className='toggle' onClick={() => setDemo(!demo)}>
          {demo ? 'Back to Login' : 'Login as demo user'}
        </p>

      </form>
    </Wrapper>
  )
}

export default Login