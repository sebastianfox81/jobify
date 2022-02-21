import React, { useContext, useReducer, useEffect } from "react";
import reducer from "./reducer";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");

export const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  user: user ? JSON.parse(user) : null,
  token: token,
  userLocation: userLocation || "",
  isEditing: false,
  editJobId: "",
  position: "",
  company: "",
  jobLocation: userLocation || "",
  jobTypeOptions: ["full time", "part time", "remote", "internship"],
  jobType: "full time",
  statusOptions: ["interview", "declined", "pending"],
  statusType: "pending",
  jobs: [],
  totalJobs: 0,
  numOfPages: 1,
  page: 1,
  search: '',
  searchStatus: 'all',
  searchType: 'all',
  sort: 'latest',
  sortOptions: ['lastest', 'oldest', 'a-z', 'z-a']
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const displayAlert = () => {
    dispatch({ type: "SHOW_ALERT" });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: "CLEAR_ALERT" });
    }, 3000);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", userLocation);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const registerUser = async (currUser) => {
    dispatch({ type: "REGISTER_USER_BEGIN" });
    try {
      const response = await axios.post("/api/v1/auth/register", currUser);
      const { user, token, location } = response.data;
      dispatch({
        type: "REGISTER_USER_SUCCESS",
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: "REGISTER_USER_ERROR",
        payload: { msg: error.response.data.msg },
      });
      console.log(error.response.data.msg);
    }
    clearAlert();
  };

  const loginUser = async (currUser) => {
    dispatch({ type: "LOGIN_USER_BEGIN" });
    try {
      const response = await axios.post("/api/v1/auth/login", currUser);
      console.log(response);
      const { user, token, location } = response.data;
      dispatch({
        type: "LOGIN_USER_SUCCESS",
        payload: { user, token, location },
      });
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: "LOGIN_USER_ERROR",
        payload: { msg: error.response.data.msg },
      });
      console.log(error.response.data.msg);
    }
    // console.log(currUser)
    clearAlert();
  };

  const logoutUser = () => {
    dispatch({ type: "LOGOUT_USER" });
    removeUserFromLocalStorage();
  };

  const updateUser = async (id, currUser) => {
    dispatch({ type: "UPDATE_USER_BEGIN" });
    try {
      const res = await axios.patch(`/api/v1/auth/updateUser/${id}`, currUser);

      const { user, location, token } = res.data;

      dispatch({
        type: "UPDATE_USER_SUCCESS",
        payload: { user, location, token },
      });
      addUserToLocalStorage({ user, location, token });
    } catch (error) {
      dispatch({
        type: "UPDATE_USER_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const handleJobChange = ({ name, value }) => {
    dispatch({ type: "HANDLE_JOB_CHANGE", payload: { name, value } });
  };

  const clearValues = () => {
    dispatch({ type: "CLEAR_VALUES" });
  };

  const createJob = async () => {
    dispatch({ type: "CREATE_JOB_BEGIN" });
    try {
      const id = state.user._id;
      console.log(id);
      const { position, company, jobLocation, jobType, statusType } = state;
      const job = { position, company, jobLocation, jobType, statusType };
      await axios.post(`/api/v1/jobs/${id}`, job);
      dispatch({ type: "CREATE_JOB_SUCCESS" });
      dispatch({ type: "CLEAR_VALUES" });
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({
        type: "CREATE_JOB_ERROR",
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const getAllJobs = async () => {
    const { search, searchStatus, searchType, sort, page } = state;

    let searchUrl = `?page=${page}&statusType=${searchStatus}&jobType=${searchType}&${sort}`;
    if (search) {
      searchUrl = searchUrl + `&search=${search}`
    }

    dispatch({ type: "GET_JOBS_BEGIN" });
    try {
      const userId = state.user._id;
      const res = await axios.get(`api/v1/jobs/${userId}${searchUrl}`);
      const { jobs, totalJobs, numOfPages } = res.data;
      dispatch({
        type: "GET_JOBS_SUCCESS",
        payload: {
          jobs,
          totalJobs,
          numOfPages,
        },
      });
      clearAlert();
      console.log(res.data.jobs);
    } catch (error) {
      console.log(error.response);
      // logoutUser();
    }

  };

  const setEditJob = (id) => {
    dispatch({ type: 'SET_EDIT_JOB', payload: id})
    console.log(`set edit job: ${id}`);
  };

  const editJob = async () => {
    dispatch({ type: 'EDIT_JOB_BEGIN'})
    try {
      const { position, company, jobType, statusType, jobLocation } = state;
      await axios.patch(`api/v1/jobs/${state.editJobId}`, {
        position,
        company,
        jobType,
        statusType,
        jobLocation
      })
      dispatch({ type: 'EDIT_JOB_SUCCESS'})
      dispatch({ type: 'CLEAR_VALUES'})
    } catch (error) {
      if (error.response.status === 401) return;
      dispatch({ type: 'EDIT_JOB_ERROR', payload: { msg: error.response.data.msg }})
    }
    clearAlert()
  }
  const deleteJob = async (jobId) => {
    dispatch({ type: 'DELETE_JOB_BEGIN'})
    try {
      await axios.delete(`/api/v1/jobs/${jobId}`)
      getAllJobs()
    } catch (error) {
      console.log(error.response)
      logoutUser()
    }
  };

  const clearFilters = () => {
    dispatch({ type: 'CLEAR_FILTERS'})
  }

  const changePage = (page) => {
    dispatch( { type: 'CHANGE_PAGE', payload: { page } })
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        logoutUser,
        updateUser,
        handleJobChange,
        clearValues,
        createJob,
        getAllJobs,
        setEditJob,
        editJob,
        deleteJob,
        clearFilters,
        changePage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider, useGlobalContext };
