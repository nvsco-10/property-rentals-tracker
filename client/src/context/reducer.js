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
       } from './actions'
       
import { initialState } from './appContext'

const reducer = (state, action) => {
  if(action.type === DISPLAY_ALERT) {
    return {
      ...state,
      showAlert: true,
      alertType: 'danger',
      alertText: 'Please provide all values!'
    }
  }

  if(action.type === CLEAR_ALERT) {
    return {
      ...state,
      showAlert: false,
      alertType: '',
      alertText: ''
    }
  }

  if(action.type === SETUP_USER_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }

  if(action.type === SETUP_USER_SUCCESS) {
    return {
      ...state,
      isLoading: true,
      user: action.payload.user,
      token: action.payload.token,
      showAlert: true,
      alertType: 'success',
      alertText: action.payload.alertText
    }
  }

  if(action.type === SETUP_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }

  if(action.type === TOGGLE_SIDEBAR) {
    return {
      ...state,
      showSidebar: !state.showSidebar
    }
  }

  if(action.type === LOGOUT_USER) {
    return {
      ...initialState,
      user: null,
      token: null
    }
  }

  if (action.type === UPDATE_USER_BEGIN) {
    return { 
      ...state, 
      isLoading: true 
    }
  }

  if (action.type === UPDATE_USER_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      token: action.payload.token,
      user: action.payload.user,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!',
    }
  }

  if (action.type === UPDATE_USER_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type === HANDLE_CHANGE) {
    return {
      ...state,
      [action.payload.name]: action.payload.value,
    }
  }

  if(action.type === CLEAR_VALUES) {
    const initialState = {
      isEditing: false,
      editRentalId: '',
      streetAddress: '',
      city: '',
      zipCode: '',
      status: 'open',
      priority: 'normal',
      // owner: '',
      assigned: ''
    }

    return {
      ...state,
      ...initialState,
    }
  }

  if (action.type === CREATE_RENTAL_BEGIN) {
    return { 
      ...state, 
      isLoading: true 
    }
  }

  if (action.type === CREATE_RENTAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Rental Created!',
    }
  }

  if (action.type === CREATE_RENTAL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === GET_ALLRENTALS_BEGIN) {
    return { 
      ...state, 
      isLoading: true,
      showAlert: false
    }
  }

  if (action.type === GET_ALLRENTALS_SUCCESS) {
    return { 
      ...state, 
      isLoading: false,
      rentals: action.payload.rentals,
      totalRentals: action.payload.totalRentals
    }
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer