import React, { useState, useEffect } from 'react';
import { FormRow } from '../components'

const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: true
}

const Register = () => {

  const [ values, setValues ] = useState(initialState);
  // global state and useNavigate
  const handleChange = (e) => {
    console.log(e.target)
  }

  const handleSubmit  = (e) => {
    e.preventDefault();
    console.log(e.target)
  }

  return <div>
    <h3>Register</h3>
    <form onSubmit={handleSubmit}>
    <FormRow type="text" value={values.name} id="name" handleChange={handleChange}/>
    <FormRow type="email" value={values.email} id="email" handleChange={handleChange}/>
    <FormRow type="password" value={values.password} id="password" handleChange={handleChange}/>
      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default Register;
