import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Navbar, BigSidebar, SmallSidebar } from '../../components';

const SharedLayout = () => {
  return (
  <main>
      <SmallSidebar />
      <BigSidebar />
      <div>
        <Navbar />
        <div>
      <Outlet />

        </div>
      </div>
  </main>
  )
};

export default SharedLayout;
