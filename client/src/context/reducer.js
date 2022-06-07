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
         GET_USERS_BEGIN,
         GET_USERS_SUCCESS,
         GET_USERS_ERROR,
         HANDLE_CHANGE,
         CLEAR_VALUES,
         GET_OWNERS_BEGIN,
         GET_OWNERS_SUCCESS,
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
         DELETE_ACTION_BEGIN,
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
         CLEAR_FILTERS
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

  if (action.type === GET_USERS_BEGIN) {
    return { 
      ...state, 
      isLoading: true 
    }
  }

  if (action.type === GET_USERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      users: action.payload.users,
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
      owner: '',
      assigned: '',
      actionItem: '',
      details: '',
      actionStatus: 'open',
      actionPriority: 'normal',
      note: '',
      editedNote: ''
    }

    return {
      ...state,
      ...initialState,
    }
  }

  if (action.type === GET_OWNERS_BEGIN) {
    return { 
      ...state, 
      isLoading: true 
    }
  }

  if (action.type === GET_OWNERS_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      owners: action.payload.owners,
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

  if(action.type === SET_EDIT_RENTAL) {
    return {
    ...state,
    isEditing: true,
    editRentalId: action.payload.id,
    streetAddress: action.payload.streetAddress,
    city: action.payload.city,
    zipCode: action.payload.zipCode,
    status: action.payload.status,
    priority: action.payload.priority,
    owner: action.payload.owner,
    assigned: action.payload.assigned,
    }
  }

  if (action.type === EDIT_RENTAL_BEGIN) {
    return {
      ...state,
      isLoading: true,
    }
  }
  if (action.type === EDIT_RENTAL_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Rental Updated!',
    }
  }
  if (action.type === EDIT_RENTAL_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type === DELETE_RENTAL_BEGIN) {
    return {
      ...state,
      isLoading: true
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

  if (action.type === GET_RENTALBYID_BEGIN) {
    return { 
      ...state, 
      isLoading: true,
      showAlert: false
    }
  }

  if (action.type === GET_RENTALBYID_SUCCESS) {
    return { 
      ...state, 
      isLoading: false,
      activeRental: action.payload.rental,
      actions: action.payload.actions
    }
  }

  if (action.type === GET_RENTALBYID_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === SET_ACTIVE_ACTION) {
    return {
      ...state,
      activeAction: action.payload.action
    }
  }

  if (action.type === CREATE_ACTION_BEGIN) {
    return { 
      ...state, 
      // isLoading: true 
    }
  }

  if (action.type === CREATE_ACTION_SUCCESS) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Action Added!',
    }
  }

  if (action.type === CREATE_ACTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type === DELETE_ACTION_BEGIN) {
    return {
      ...state,
      // isLoading: true
    }
  }

  if(action.type === SET_EDIT_ACTION) {
    return {
    ...state,
    isEditing: true,
    actionItem: action.payload.actionItem,
    details: action.payload.details,
    actionStatus: action.payload.actionStatus,
    actionPriority: action.payload.actionPriority,
    }
  }

  if (action.type === EDIT_ACTION_BEGIN) {
    return {
      ...state,
      // isLoading: true,
    }
  }
  if (action.type === EDIT_ACTION_SUCCESS) {
    return {
      ...state,
      // isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Action Updated!',
    }
  }
  if (action.type === EDIT_ACTION_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if (action.type === SET_ACTIVE_NOTE) {
    return {
      ...state,
      activeNote: action.payload.note
    }
  }

  if (action.type === CREATE_NOTE_SUCCESS) {
    return {
      ...state,
      activeAction: action.payload.activeAction
    }

  }

  if(action.type === SET_EDIT_NOTE) {
    const note = state.activeAction.notes.find((note) => note._id === action.payload.id)
   
    return {
    ...state,
    isEditing: true,
    editedNote: note.note
    }
  }

  if (action.type === EDIT_NOTE_SUCCESS) {
    return {
      ...state,
      // isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Note Updated!',
    }
  }
  if (action.type === EDIT_NOTE_ERROR) {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }

  if(action.type === DELETE_NOTE_BEGIN) {
    return {
      ...state,
      // isLoading: true
    }
  }

  if(action.type === CLEAR_FILTERS) {
    return {
      ...state,
      search: '',
      searchStatus: 'active'
    }
  }

  throw new Error(`no such action : ${action.type}`)
}

export default reducer