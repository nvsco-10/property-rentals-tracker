import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'

import { DISPLAY_ALERT,
         CLEAR_ALERT,
         SETUP_USER_BEGIN,
         SETUP_USER_SUCCESS,
         SETUP_USER_ERROR, 
         TOGGLE_SIDEBAR,
         LOGOUT_USER,
         UPDATE_USER_BEGIN,
         UPDATE_USER_SUCCESS,
         UPDATE_USER_ERROR
       } from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: '',
  showSidebar: false,
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })

  // request interceptor
  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config 
    }, 
    
    (error) => {
      return Promise.reject(error)
    }
  )

  // response interceptor
  authFetch.interceptors.response.use(
    (response) => {
    return response
    }, 
    
    (error) => {
   
      if(error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )



  const displayAlert = () => {
    dispatch({type: DISPLAY_ALERT})
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({type: CLEAR_ALERT})
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token}) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)
      const { user, token } = data

      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText }
      })

      addUserToLocalStorage({ user, token })

    } catch(error) {
      if(error.response.status !== 401) {
        dispatch({
          type: SETUP_USER_ERROR,
          payload: { msg: error.response.data.msg }
        })
      }
      
    }
    
    clearAlert()
  }

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR })
  }

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)
      
      const { user, token } = data

      dispatch({ 
        type: UPDATE_USER_SUCCESS,
        payload: { user, token } 
      })

      addUserToLocalStorage({ user, token })

    } catch (error) {
      dispatch({ 
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  return (
    <AppContext.Provider  
      value={
        {...state,
        displayAlert,
        setupUser,
        toggleSidebar,
        logoutUser,
        updateUser
        }}
    >
      {children}
    </AppContext.Provider>
  )
} 

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }