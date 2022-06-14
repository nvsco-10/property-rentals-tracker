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
         CREATE_USER_BEGIN,
         CREATE_USER_SUCCESS,
         CREATE_USER_ERROR,
         SET_ACTIVE_USER,
         SET_EDIT_USER,
         UPDATE_USER_BEGIN,
         UPDATE_USER_SUCCESS,
         UPDATE_CURRENTUSER_SUCCESS,
         UPDATE_USER_ERROR,
         DELETE_ADMIN_ERROR,
         GET_USERS_BEGIN,
         GET_USERS_SUCCESS,
         GET_USERS_ERROR,
         HANDLE_CHANGE,
         CLEAR_VALUES,
         CREATE_OWNER_BEGIN,
         CREATE_OWNER_SUCCESS,
         CREATE_OWNER_ERROR,
         GET_OWNERS_BEGIN,
         GET_OWNERS_SUCCESS,
         SET_ACTIVE_OWNER,
         SET_EDIT_OWNER,
         EDIT_OWNER_SUCCESS,
         EDIT_OWNER_ERROR,
         GET_RENTALBYOWNER_BEGIN,
         GET_RENTALBYOWNER_SUCCESS,
         GET_RENTALBYOWNER_ERROR,
         GET_ASSIGNEDRENTALS_BEGIN,
         GET_ASSIGNEDRENTALS_SUCCESS,
         GET_ASSIGNEDRENTALS_ERROR,
         CREATE_RENTAL_BEGIN,
         CREATE_RENTAL_SUCCESS,
         CREATE_RENTAL_ERROR,
         SET_EDIT_RENTAL,
         EDIT_RENTAL_BEGIN,
         EDIT_RENTAL_SUCCESS,
         EDIT_RENTAL_ERROR,
         DELETE_RENTAL_BEGIN,
         GET_ALLRENTALS_BEGIN,
         GET_ALLRENTALS_SUCCESS,
         GET_RENTALBYID_BEGIN,
         GET_RENTALBYID_SUCCESS,
         GET_RENTALBYID_ERROR,
         SET_ACTIVE_ACTION,
         CREATE_ACTION_BEGIN,
         CREATE_ACTION_SUCCESS,
         CREATE_ACTION_ERROR,
         DELETE_ACTION_SUCCESS,
         SET_EDIT_ACTION,
         EDIT_ACTION_BEGIN,
         EDIT_ACTION_SUCCESS,
         EDIT_ACTION_ERROR,
         CREATE_NOTE_BEGIN,
         CREATE_NOTE_SUCCESS,
         CREATE_NOTE_ERROR,
         SET_ACTIVE_NOTE,
         SET_EDIT_NOTE,
         EDIT_NOTE_SUCCESS,
         EDIT_NOTE_ERROR,
         DELETE_NOTE_BEGIN,
         CLEAR_FILTERS,
         GET_STATS_BEGIN,
         GET_STATS_SUCCESS
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
  users: [],
  assignedRentals: [],
  showSidebar: false,
  owners: [],
  ownerName: '',
  activeOwner: {},
  ownerRentals: [],
  activeUser: {},
  username: '',
  password: '',
  firstName: '',
  lastName: '',
  email: '',
  isAdmin: false,
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
  search: '',
  searchStatus: 'active',
  activeRental: {},
  actions: [],
  activeAction: {},
  totalRentals: 0,
  actionItem: '',
  details: '',
  actionStatusOptions: ['open', 'closed'],
  actionStatus: 'open',
  actionPriorityOptions: ['normal', 'high'],
  actionPriority: 'normal',
  activeNote: {},
  note: '',
  editedNote: '',
  stats: {},
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

  const displayAlert = (alertText) => {
    dispatch({
      type: DISPLAY_ALERT,
      payload: {
        alertText: alertText
      }
      })
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

  // mainly for login - setupUser can also be used for register user functionality if one will be implemented in the future
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
        dispatch({
          type: SETUP_USER_ERROR,
          payload: { msg: error.response.data.msg }
        })
      
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

  // for manage users page
  const createUser = async (currentUser) => {
    dispatch({ type: CREATE_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/createUser`, currentUser)
      const { user } = data

      dispatch({
        type: CREATE_USER_SUCCESS,
      })

      clearValues()
      getUsers()

    } catch(error) {
      if(error.response.status !== 401) {
        dispatch({
          type: CREATE_USER_ERROR,
          payload: { msg: error.response.data.msg }
        })
      }
      
    }
    
    clearAlert()
  }

  const setUser = (user) => {
    dispatch({ 
      type: SET_ACTIVE_USER,
      payload: {
        activeUser: user,
      }
    })
  }

  const setEditUser = (id) => {
   
    dispatch({ 
      type: SET_EDIT_USER, 
      payload: 
        { 
          id: id
        } 
    })
  }

  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { activeUser, user } = state
      const { data } = await authFetch.patch(`/auth/users/${activeUser.id}`, currentUser)
      

      if(activeUser.id === user._id) {
        dispatch({ 
          type: UPDATE_CURRENTUSER_SUCCESS,
          payload: { 
            user: data.user
          } 
        })
      }

      if(activeUser.id !== user._id) {
        dispatch({ type: UPDATE_USER_SUCCESS })
      }

      clearValues()
      getUsers()

    } catch (error) {
      dispatch({ 
        type: UPDATE_USER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const deleteUser = async () => {
    const { activeUser } = state

    try {
      if(activeUser.id === process.env.REACT_APP_ADMIN) {
        dispatch({ 
          type: DELETE_ADMIN_ERROR
        })
        clearAlert()
        return
      }
      await authFetch.delete(`/auth/users/${activeUser.id}`)

      getUsers()

    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const getUsers = async () => {

    dispatch({ type: GET_USERS_BEGIN })
    try {
      const { data } = await authFetch.get('/auth/users')
      const { users } = data

      dispatch({ 
        type: GET_USERS_SUCCESS,
        payload: {
          users
        }
      })

    } catch (error) {
      logoutUser()
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

  const createOwner = async () => {
    dispatch({ type: CREATE_OWNER_BEGIN })
    try {
      const { ownerName } = state

      await authFetch.post('/owners', {
        name: ownerName
      })

      dispatch({ type: CREATE_OWNER_SUCCESS })

      clearValues()
      getOwners()

    } catch (error) {
      if(error.response.status === 401) return
      dispatch({
        type: CREATE_OWNER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const getOwners = async () => {
    dispatch({ type: GET_OWNERS_BEGIN })
    try {
      const { data } = await authFetch.get('/owners')
      const { owners } = data
      // console.log(owners)

      dispatch({ 
        type: GET_OWNERS_SUCCESS,
        payload: {
          owners
        }
      })

    } catch (error) {
      logoutUser()
    }
    clearAlert()
  }

  const setOwner = (owner) => {
    dispatch({ 
      type: SET_ACTIVE_OWNER,
      payload: {
        owner: owner,
      }
    })

    getRentalsByOwner(owner.id)
    
  }

  const setEditOwner = (id) => {
   
    dispatch({ 
      type: SET_EDIT_OWNER, 
      payload: 
        { 
          id: id
        } 
    })
  }

  const editOwner = async () => {
    try {
      const { ownerName, activeOwner } = state

      await authFetch.patch(`/owners/${activeOwner.id}`, {
        name: ownerName
      })

      dispatch({ type: EDIT_OWNER_SUCCESS })
      
      clearValues()
      getOwners()

    } catch (error) {

      if(error.response.status === 401) return
      dispatch({
        type: EDIT_OWNER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const deleteOwner = async () => {
    const { activeOwner } = state

    try {
      await authFetch.delete(`/owners/${activeOwner.id}`)

      getOwners()

    } catch (error) {
      logoutUser()
    }
  }

  const getRentalsByOwner = async (id) => {
    dispatch({ type: GET_RENTALBYOWNER_BEGIN })
    try {
      const { data } = await authFetch.get(`/rentals/owners/${id}`)
      const { rentals } = data

      dispatch({ 
        type: GET_RENTALBYOWNER_SUCCESS,
        payload: {
          rentals: rentals,
        }
      })

    } catch (error) {
      dispatch({ 
        type: GET_RENTALBYOWNER_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const getAssignedRentals = async (id) => {
    dispatch({ type: GET_ASSIGNEDRENTALS_BEGIN })
    try {
      const { data } = await authFetch.get(`/rentals/user`)
      const { rentals } = data

      dispatch({ 
        type: GET_ASSIGNEDRENTALS_SUCCESS,
        payload: {
          assignedRentals: rentals,
        }
      })

    } catch (error) {
      dispatch({ 
        type: GET_ASSIGNEDRENTALS_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
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

  const setEditRental = () => {
    const { activeRental } = state
    // console.log(activeRental)

    dispatch({ 
      type: SET_EDIT_RENTAL, 
      payload: 
        { 
          id: activeRental._id,
          streetAddress: activeRental.streetAddress,
          city: activeRental.city,
          zipCode: activeRental.zipCode,
          status: activeRental.status,
          priority: activeRental.priority,
          owner: activeRental.owner._id,
          assigned: activeRental.assigned._id,
        } 
    })
  }

  const editRental = async () => {
    dispatch({ type: EDIT_RENTAL_BEGIN })
    try {
      const { editRentalId, streetAddress, city, zipCode, status, priority, owner, assigned } = state
      await authFetch.patch(`/rentals/${editRentalId}`, {
        streetAddress,
        city,
        zipCode,
        status,
        priority,
        owner,
        assigned
      })

      dispatch({ type: EDIT_RENTAL_SUCCESS })
      
      clearValues()
      
    } catch (error) {

      if(error.response.status === 401) return
      dispatch({
        type: EDIT_RENTAL_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const deleteRental = async () => {
    const { activeRental } = state

    dispatch({ type: DELETE_RENTAL_BEGIN })
    try {
      await authFetch.delete(`/rentals/${activeRental._id}`)

      clearValues()
      getAllRentals()

    } catch (error) {

      logoutUser()
    }
  }

  const getAllRentals = async () => {
    const { search, searchStatus } = state

    let url = `/rentals?status=${searchStatus}`
    if(search) {
      url = url + `&search=${search}`
    }

    dispatch({ type: GET_ALLRENTALS_BEGIN })
    try {
      const { data } = await authFetch.get(url)
      const { rentals, totalRentals } = data
      // console.log(rentals)

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
          actions: rental[0].actions
        }
      })

    } catch (error) {
      dispatch({ 
        type: GET_RENTALBYID_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
  }

  const refreshRental = async(id) => {
    try {
      const { data } = await authFetch.get(`/rentals/${id}`)
      const { rental } = data
      // console.log(rental)

      dispatch({ 
        type: GET_RENTALBYID_SUCCESS,
        payload: {
          rental: rental[0],
          actions: rental[0].actions
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
        action: action,
      }
    })
    
  }

  const createAction = async (rentalId) => {
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
      setTimeout(() => {
        refreshRental(rentalId)
      }, 1000)
      

    } catch (error) {
      if(error.response.status === 401) return
      dispatch({
        type: CREATE_ACTION_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const deleteAction = async (actionId) => {
    const { activeRental } = state

    try {
      await authFetch.delete(`/rentals/actions/${actionId}`)

      refreshRental(activeRental._id)

      dispatch({ type: DELETE_ACTION_SUCCESS})

    } catch (error) {

      logoutUser()
    }
  }

  const setEditAction = () => {
    const { activeAction } = state;

    dispatch({ 
      type: SET_EDIT_ACTION,
      payload: {
        actionItem: activeAction.actionItem,
        details: activeAction.details,
        actionStatus: activeAction.status,
        actionPriority: activeAction.priority
      }
      
    })
    
  }

  const editAction = async (actionId) => {
    const { activeRental, activeAction } = state
    
    // dispatch({ type: EDIT_ACTION_BEGIN })
    try {
      const { actionItem, details, actionStatus, actionPriority } = state;
      const { data } = await authFetch.patch(`/rentals/actions/${actionId}`, {
        actionItem,
        details,
        status: actionStatus,
        priority: actionPriority
      })

      const { updatedAction } = data

      dispatch({ type: EDIT_ACTION_SUCCESS })
      
      clearValues()
      setTimeout(() => {
        refreshRental(activeRental._id)
        setAction({
          id: updatedAction._id,
          actionItem: updatedAction.actionItem,
          details: updatedAction.details,
          status: updatedAction.status,
          priority: updatedAction.priority,
          notes: updatedAction.notes,
          createdAt: activeAction.createdAt,
          createdBy: activeAction.createdBy,
          updatedAt: updatedAction.updatedAt
        })
      }, 1000)

    } catch (error) {

      if(error.response.status === 401) return
      dispatch({
        type: EDIT_ACTION_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const createNote = async () => {
    const { activeRental, activeAction } = state
    const { id } = activeAction
  
    try {
      const { note } = state

      const { data } = await authFetch.post(`/rentals/actions/${id}`, {
        note
      })

      const { updatedAction } = data

      clearValues()
      refreshRental(activeRental._id)

      setAction({
        id: updatedAction._id,
        actionItem: updatedAction.actionItem,
        details: updatedAction.details,
        status: updatedAction.status,
        priority: updatedAction.priority,
        notes: updatedAction.notes,
        createdAt: activeAction.createdAt,
        createdBy: activeAction.createdBy,
        updatedAt: updatedAction.updatedAt
      })

    } catch (error) {
      dispatch({ 
        type: CREATE_NOTE_ERROR,
        payload: {
          payload: { msg: error.response.data.msg }
        } 
      })
    }
  }

  const setNote = (note) => {
    dispatch({ 
      type: SET_ACTIVE_NOTE,
      payload: {
        note: note,
      }
    })

  }

  const setEditNote = (id) => {

    dispatch({ 
      type: SET_EDIT_NOTE,
      payload: { id }
    })
    
  }

  const editNote = async () => {
    const { editedNote, activeNote, activeAction, activeRental } = state
    
    try {
      const { data } = await authFetch.patch(`/rentals/actions/${activeAction.id}/${activeNote._id}`, {
        note: editedNote
      })

      const { updatedAction } = data

      dispatch({ type: EDIT_NOTE_SUCCESS })
      
      clearValues()

      setTimeout(() => {
        refreshRental(activeRental._id)
        setAction({
          id: updatedAction._id,
          actionItem: updatedAction.actionItem,
          details: updatedAction.details,
          status: updatedAction.status,
          priority: updatedAction.priority,
          notes: updatedAction.notes,
          createdAt: activeAction.createdAt,
          createdBy: activeAction.createdBy,
          updatedAt: updatedAction.updatedAt
        })  
      }, 1000)

    } catch (error) {

      if(error.response.status === 401) return
      dispatch({
        type: EDIT_NOTE_ERROR,
        payload: { msg: error.response.data.msg }
      })
    }
    clearAlert()
  }

  const deleteNote = async () => {
    const { activeNote, activeAction, activeRental } = state

    try {
      const { data } = await authFetch.delete(`/rentals/actions/${activeAction.id}/${activeNote._id}`)
      
      const { updatedAction } = data
      refreshRental(activeRental._id)

      setAction({
        id: updatedAction._id,
        actionItem: updatedAction.actionItem,
        details: updatedAction.details,
        status: updatedAction.status,
        priority: updatedAction.priority,
        notes: updatedAction.notes,
        createdAt: activeAction.createdAt,
        createdBy: activeAction.createdBy,
        updatedAt: updatedAction.updatedAt
      })  

    } catch (error) {
      logoutUser()
    }
  }

  const clearFilters = () => {
    dispatch({ type: CLEAR_FILTERS })
  }

  const getStats = async () => {
    dispatch({ type: GET_STATS_BEGIN })
    try {
      const { data } = await authFetch('/rentals/stats')
      dispatch({
        type: GET_STATS_SUCCESS,
        payload: {
          stats: data.stats,
        },
      })
    } catch (error) {
      console.log(error.msg)
      logoutUser()
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
        createUser,
        setUser,
        setEditUser,
        updateUser,
        deleteUser,
        getUsers,
        handleChange,
        clearValues,
        createOwner,
        getOwners,
        setOwner,
        setEditOwner,
        editOwner,
        deleteOwner,
        getRentalsByOwner,
        getAssignedRentals,
        createRental,
        setEditRental,
        editRental,
        deleteRental,
        getAllRentals,
        getRentalById,
        setAction,
        createAction,
        deleteAction,
        setEditAction,
        editAction,
        createNote,
        setNote,
        setEditNote,
        editNote,
        deleteNote,
        clearFilters,
        getStats
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