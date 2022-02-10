import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from 'axios';

const user = localStorage.getItem('user')
const token = localStorage.getItem('token')
const userLocation = localStorage.getItem('userLocation')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: null,
  userLocation: userLocation || '',
  jobLocation: userLocation || '',
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: 'SHOW_ALERT' });
    clearAlert()
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: 'CLEAR_ALERT'})
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
    localStorage.setItem('location', location)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    localStorage.removeItem('location')
  }

  const registerUser = async (currUser) => {
    dispatch({ type: 'REGISTER_USER_BEGIN'})
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/register', currUser)
      console.log(res)
      const { user, token, location } = res.data
      dispatch({
        type: 'REGISTER_USER_SUCCESS',
        payload: { user, token, location },
      })
      addUserToLocalStorage({ user, token, location })
    } catch (err) {
      console.log(err)
      dispatch({ type: 'REGISTER_USER_ERROR', payload: { msg: err.res.data.msg}})
    }
    // console.log(currUser)
    clearAlert()
  }



  return (
    <AppContext.Provider value={{ ...state, displayAlert, registerUser }}>
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
