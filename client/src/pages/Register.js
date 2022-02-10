import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormRow, Alert } from '../components';
import { useGlobalContext } from '../context/appContext'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,

}

const Register = () => {
  const navigate = useNavigate();
  const [ values, setValues ] = useState(initialState);
  const { user, isLoading, showAlert, displayAlert, registerUser } = useGlobalContext();

  const { name, email, password, isMember} = values;

  const toggleMember = () => {
    setValues({...values, isMember: !isMember})
  }

  const handleChange = (e) => {
    setValues({
      ...values, [e.target.id]: e.target.value
    })
  }

  const handleSubmit  = (e) => {
    e.preventDefault();
    if (!email || !password || (!isMember && !name)) {
      displayAlert();
      return
    }
    const currUser = { name, email, password}
    if (isMember) {
      console.log('User is already a member')
    } else {
      registerUser(currUser)
    }
  }

  // useEffect(() => {
  //   if (user) {
  //     setTimeout(() => {
  //       navigate('/')
  //       console.log('navigated!')
  //     }, 3000)
  //   }
  // }, [user, navigate])


  return (
  <div>
    <h3>{isMember ? 'Login' : 'Register'}</h3>
    {showAlert && <Alert />}
    <form className="form"onSubmit={handleSubmit}>
      {!isMember &&
    <FormRow type="text" value={name} id="name" handleChange={handleChange}/>
      }
    <FormRow type="email" value={email} id="email" handleChange={handleChange}/>
    <FormRow type="password" value={password} id="password" handleChange={handleChange}/>
      <button type="submit" className="btn" disabled={isLoading}>Submit</button>
    <p>
      {isMember ? 'Not a member yet?' : 'Already a member'}
    </p>
      <button className="btn" type="button" onClick={toggleMember}>
        {isMember ? 'Register' : 'Login'}
      </button>
    </form>
  </div>
  );
};

export default Register;
