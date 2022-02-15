import React, {useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useGlobalContext } from '../../context/appContext';


const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useGlobalContext();

  const [ values, setValues] = useState({
    name: user?.name,
    email: user?.email,
    lastname: user?.lastname,
    location: user?.location
  })

  const { name, email, lastname, location } = values;

  const handleChange = (e) => {
    setValues({...values, [e.target.id]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove if check while testing
    // if (!name || !email || !lastname || !location) {
    //   displayAlert()
    //   return
    // }
    updateUser({ name, email, lastname, location})
    console.log('submit')
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h3>
        Profile
      </h3>
      {showAlert && <Alert />}
      <div>
        <FormRow type='text' id='name' value={name} handleChange={handleChange}/>
        <FormRow type='text' id='email' value={email} handleChange={handleChange}/>
        <FormRow type='text' id='lastname' value={lastname} handleChange={handleChange}/>
        <FormRow type='text' id='location' value={location} handleChange={handleChange}/>
      </div>
      <button type='submit' disabled={isLoading}>{isLoading ? 'Please wait...' : 'Save Changes'}</button>
      </form>


    </div>
  )
};

export default Profile;
