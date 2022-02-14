import React from 'react';
import { FaHome } from 'react-icons/fa';
import { useGlobalContext } from '../context/appContext';

const Navbar = () => {

  const { logoutUser, user } = useGlobalContext();

  return (
    <div>
      <h2>Navbar</h2>
      <button onClick={logoutUser}><h5>Logout</h5></button>
      <FaHome />
    </div>
  )
}

export default Navbar