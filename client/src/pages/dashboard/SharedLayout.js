import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const SharedLayout = () => {
  return (
  <div>
    <nav>
      <Link to='add-job'>add job</Link>
      <Link to='all-jobs'>all jobs</Link>
      </nav>
      <Outlet />
  </div>
  )
};

export default SharedLayout;
