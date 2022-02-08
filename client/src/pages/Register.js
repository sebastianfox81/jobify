import React, { useState, useEffect } from 'react';
import { FormRow, Alert } from '../components'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true,
  showAlert: false
}

const Register = () => {

  const [ values, setValues ] = useState(initialState);
  // global state and useNavigate
  const { name, email, password, isMember, showAlert } = values;

  const toggleMember = () => {
    setValues({...values, isMember: !isMember})
  }

  const handleChange = (e) => {
    console.log(e.target)
  }

  const handleSubmit  = (e) => {
    e.preventDefault();
    console.log(e.target)
  }


  return (
  <div>
    <h3>{isMember ? 'Login' : 'Register'}</h3>
    {showAlert && <Alert />}
    <form onSubmit={handleSubmit}>
      {!isMember &&
    <FormRow type="text" value={name} id="name" handleChange={handleChange}/>
      }
    <FormRow type="email" value={email} id="email" handleChange={handleChange}/>
    <FormRow type="password" value={password} id="password" handleChange={handleChange}/>
      <button type="submit">Submit</button>
    <p>
      {isMember ? 'Not a member yet?' : 'Already a member'}
    </p>
      <button type="button" onClick={toggleMember}>
        {isMember ? 'Register' : 'Login'}
      </button>
    </form>
  </div>
  );
};

export default Register;
