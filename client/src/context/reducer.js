// import { DISPLAY_ALERT } from './actions'

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
      jobLocation: action.payload.jobLocation,
      showAlert: true,
      alertType: 'success',
      alertText: 'New User Created! Redirecting...'
    };
  }
  return state;
};

export default reducer;
