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
         UPDATE_USER_ERROR,
         HANDLE_CHANGE,
         CLEAR_VALUES,
         CREATE_RENTAL_BEGIN,
         CREATE_RENTAL_SUCCESS,
         CREATE_RENTAL_ERROR,
         GET_ALLRENTALS_BEGIN,
         GET_ALLRENTALS_SUCCESS,
         GET_RENTALBYID_BEGIN,
         GET_RENTALBYID_SUCCESS,
         GET_RENTALBYID_ERROR,
         SET_ACTIVE_ACTION,
         SET_ACTIVE_ACTION_SUCCESS,
         CREATE_ACTION_BEGIN,
         CREATE_ACTION_SUCCESS,
         CREATE_ACTION_ERROR,
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
  isEditing: false,
  editRentalId: '',
  streetAddress: '',
  city: '',
  zipCode: '',
  statusOptions: ['open', 'pending-lease', 'maintenance', 'closed'],
  status: 'open',
  priorityOptions: ['normal', 'high'],
  priority: 'normal',
  owner: '',
  assigned: '',
  rentals: [],
  rentalById: [],
  activeAction: {},
  totalRentals: 0,
  actionItem: '',
  details: '',
  actionStatusOptions: ['open', 'closed'],
  actionStatus: 'open',
  actionPriorityOptions: ['normal', 'high'],
  actionPriority: 'normal',
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

  const handleChange = ({ name, value }) => {
    dispatch({ 
      type: HANDLE_CHANGE, 
      payload: { name, value }
    })
  }

  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }

  const createRental = async () => {
    dispatch({ type: CREATE_RENTAL_BEGIN })
    try {
      // add owner back
      const { streetAddress, city, zipCode, status, priority, assigned, owner } = state

      await authFetch.post('/rentals', {
        streetAddress,
        city,
        zipCode,
        status,
        priority,
        owner,
        assigned
      })

      dispatch({ type: CREATE_RENTAL_SUCCESS })

      clearValues()

    } catch (error) {
      if(error.response.status === 401) return
      dispatch({
        type: CREATE_RENTAL_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const getAllRentals = async () => {
    let url = `/rentals`

    dispatch({ type: GET_ALLRENTALS_BEGIN })
    try {
      const { data } = await authFetch.get(url)
      const { rentals, totalRentals } = data
      // console.log(data)

      dispatch({ 
        type: GET_ALLRENTALS_SUCCESS,
        payload: {
          rentals,
          totalRentals
        }
      })

    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const getRentalById = async(id) => {
    dispatch({ type: GET_RENTALBYID_BEGIN })
    try {
      const { data } = await authFetch.get(`/rentals/${id}`)
      const { rental } = data
      // console.log(rental[0])

      dispatch({ 
        type: GET_RENTALBYID_SUCCESS,
        payload: {
          rental: rental[0],
        }
      })

    } catch (error) {
      dispatch({ 
        type: GET_RENTALBYID_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const setAction = (action) => {
    // console.log(action)
    dispatch({ 
      type: SET_ACTIVE_ACTION,
      payload: {
        action: action
      }
    })

    dispatch({ 
      type: SET_ACTIVE_ACTION_SUCCESS,
    })
  }

  const createAction = async (rentalId) => {
    dispatch({ type: CREATE_ACTION_BEGIN })
    try {
      const { actionItem, details, actionStatus, actionPriority } = state

      await authFetch.post(`/rentals/${rentalId}`, {
        actionItem,
        details,
        status: actionStatus,
        priority: actionPriority
      })

      dispatch({ type: CREATE_ACTION_SUCCESS })

      clearValues()

    } catch (error) {
      if(error.response.status === 401) return
      dispatch({
        type: CREATE_ACTION_ERROR,
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
        updateUser,
        handleChange,
        clearValues,
        createRental,
        getAllRentals,
        getRentalById,
        setAction,
        createAction
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