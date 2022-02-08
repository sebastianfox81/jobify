// import { DISPLAY_ALERT } from './actions'

const reducer = (state, action) => {
  if (action.type === 'SHOW_ALERT') {
    return {
      ...state,
      showAlert: true,
      alertText: 'Please provide all values',
      alertType: 'danger',
    }
  }
  if (action.type === 'CLEAR_ALERT') {
    return {
      ...state,
      showAlert: false,
      alertText: '',
      alertType: '',
    }
  }
  return state
}

export default reducer