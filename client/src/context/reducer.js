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
      userLocation: action.payload.userLocation,
      jobLocation: action.payload.userLocation,
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
      page: 1,
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
  if (action.type === 'GET_JOBS_BEGIN') {
    return {...state, isLoading: true, showAlert: false}
  }
  if (action.type === 'GET_JOBS_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      jobs: action.payload.jobs,
      totalJobs: action.payload.totalJobs,
      numOfPages: action.payload.numOfPages
    }
  }
  if (action.type === 'SET_EDIT_JOB') {

    const job = state.jobs.find((job) => job._id === action.payload)
    console.log(job)
    const { _id, position, jobLocation, company, statusType, jobType } = job;
    return {
      ...state,
      isEditing: true,
      editJobId: _id,
      position,
      jobLocation,
      company,
      statusType,
      jobType
    }
  }
  if (action.type === 'DELETE_JOB_BEGIN') {
    return {
      ...state,
    isLoading: true
    }
  }
  if (action.type === 'EDIT_JOB_BEGIN') {
    return {...state, isLoading: true}
  }
  if (action.type === 'EDIT_JOB_SUCCESS') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'success',
      alertText: 'Job Updated!'
    }
  }
  if (action.type === 'EDIT_JOB_ERROR') {
    return {
      ...state,
      isLoading: false,
      showAlert: true,
      alertType: 'danger',
      alertText: action.payload.msg
    }
  }
  if (action.type === 'CLEAR_FILTERS') {
    return {
      ...state,
      search: '',
      searchStatus: 'all',
      searchType: 'all',
      sort: 'latest'
    }
  }
  if (action.type === 'CHANGE_PAGE') {
    return {
      ...state,
      page: action.payload.page
    }
  }

  return state;
};

export default reducer;
