import React, { useContext, useReducer, useState } from 'react';
import reducer from './reducer'

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
}

const AppContext = React.createContext();

const AppProvider = ({children}) => {

  const [ state, dispatch ] = useReducer(reducer, initialState)

  return <AppContext.Provider value={{...state}}>{children}</AppContext.Provider>
}

const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider, useGlobalContext }