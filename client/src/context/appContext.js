import React, { useContext, useReducer } from "react";
import reducer from "./reducer";
import axios from 'axios';

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: null,
  token: null,
  userLocation: '',
  jobLocation: '',
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

  const registerUser = async (currUser) => {
    dispatch({ type: 'REGISTER_USER_BEGIN'})
    try {
      const res = await axios.post('http://localhost:5000/api/v1/auth/register', currUser)
      console.log(res.data)
      const { user, token, location } = res.data
      dispatch({
        type: 'REGISTER_USER_SUCCESS',
        payload: { user, token, location }
      })
    } catch (err) {
      console.log(err)
    }
    console.log(currUser)
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
