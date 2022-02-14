import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useGlobalContext } from '../context/appContext';
import { Link } from 'react-router-dom'

const Navbar = () => {

  const { logoutUser, user } = useGlobalContext();

  return (
    <div>
      <h2>Navbar</h2>
      <Link to='/'>Stats</Link>
      <Link to='/add-job'>Add Job</Link>
      <Link to='/all-jobs'>All Jobs</Link>
      <Link to='/profile'>My Profile</Link>
      <button onClick={logoutUser}><h5>Logout</h5></button>
      <FaHome />
    </div>
  )
}

export default Navbar