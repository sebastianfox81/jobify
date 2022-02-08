import React, { useState, useEffect } from 'react';

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
      <label htmlFor="name"></label>
      <input type="text" id="name" onChange={handleChange}/>
      <label htmlFor="email"></label>
      <input type="text" id="email" onChange={handleChange}/>
      <label htmlFor="password"></label>
      <input type="text" id="password" onChange={handleChange}/>
      <button type="submit">Submit</button>
    </form>
  </div>;
};

export default Register;
