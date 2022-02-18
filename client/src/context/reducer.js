// import { DISPLAY_ALERT } from './actions'

import { initialState } from './appContext'

const reducer = (state, action) => {
  if (action.type === "SHOW_ALERT") {
    return {
      ...state,
      showAlert: true,
      alertText: "Please provide all values",
      alertType: "danger",
    };
  }
  if (action.type === "CLEAR_ALERT") {
    return {
      ...state,
      showAlert: false,
      alertText: "",
      alertType: "",
    };
  }
  if (action.type === "REGISTER_USER_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "REGISTER_USER_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.userLocation,
      jobLocation: action.payload.userLocation,
      showAlert: true,
      alertType: 'success',
      alertText: 'New User Created! Redirecting...'
    };
  }
  if (action.type === "REGISTER_USER_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === "LOGIN_USER_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "LOGIN_USER_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.userLocation,
      jobLocation: action.payload.userLocation,
      showAlert: true,
      alertType: 'success',
      alertText: 'Login Successful! Redirecting...'
    };
  }

  if (action.type === "LOGIN_USER_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === 'LOGOUT_USER') {
    return {
      ...initialState,
      user: null,
      token: null,
      jobLocation: '',
      userLocation: '',
    }
  }

  if (action.type === "UPDATE_USER_BEGIN") {
    return { ...state, isLoading: true };
  }
  if (action.type === "UPDATE_USER_SUCCESS") {
    return {
      ...state,
      isLoading: false,
      user: action.payload.user,
      token: action.payload.token,
      userLocation: action.payload.location,
      jobLocation: action.payload.location,
      showAlert: true,
      alertType: 'success',
      alertText: 'User Profile Updated!'
    };
  }
  if (action.type === "UPDATE_USER_ERROR") {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    };
  }
  if (action.type === 'HANDLE_JOB_CHANGE') {
    return {
      ...state,
      [action.payload.name]: action.payload.value
    }
  }
  if (action.type === 'CLEAR_VALUES') {
    const initialState = {
      isEditing: false,
      editJobId: '',
      position: '',
      company: '',
      jobLocation: state.userLocation,
      jobType: 'full time',
      statusType: 'pending'
    }
    return {...state, ...initialState}
  }

  if (action.type === 'CREATE_JOB_BEGIN') {
    return {...state, isLoading: true}
  }
  if (action.type === 'CREATE_JOB_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'New Job Created',
    }
  }
  if (action.type === 'CREATE_JOB_ERROR') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg,
    }
  }
  return state;
};

export default reducer;
