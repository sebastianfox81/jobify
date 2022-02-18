import React, {useState } from 'react';
import { FormRow, Alert } from '../../components';
import { useGlobalContext } from '../../context/appContext';


const Profile = () => {
  const { user, showAlert, displayAlert, updateUser, isLoading } = useGlobalContext();
//  console.log(user._id)
//  console.log(user)
  const [ values, setValues] = useState({
    name: user?.name,
    email: user?.email,
    lastname: user?.lastname,
    location: user?.location
  })

  const { name, email, lastname, location } = values;
  const handleChange = (e) => {
    setValues({...values, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // Remove if check while testing
    // if (!name || !email || !lastname || !location) {
    //   displayAlert()
    //   return
    // }
    updateUser(user._id, { name, email, lastname, location })
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
      <h3>
        Profile
      </h3>
      {showAlert && <Alert />}
      <div>
        <FormRow type='text' name='name' value={name} handleChange={handleChange}/>
        <FormRow type='text' name='email' value={email} handleChange={handleChange}/>
        <FormRow type='text' name='lastname' value={lastname} handleChange={handleChange}/>
        <FormRow type='text' name='location' value={location} handleChange={handleChange}/>
      </div>
      <button type='submit' disabled={isLoading}>{isLoading ? 'Please wait...' : 'Save Changes'}</button>
      </form>


    </div>
  )
};

export default Profile;