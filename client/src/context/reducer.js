// import { DISPLAY_ALERT } from './actions'

const reducer = (state, action) => {
  if (action.type === 'SHOW_ALERT') {
    return {
      ...state,
      showAlert: true,
      alertText: 'Please provide all values',
      alertType: 'danger',}
  }
  return state
}

export default reducer