import React from 'react';
import { Link } from 'react-router-dom'

const Landing = () => {


  return <div>
       <h1><span>Logo</span>Landing</h1>
       <h4>Job Tracking App</h4>
       <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Est, laboriosam! Maiores obcaecati nobis, beatae aliquam facere voluptatem dolore blanditiis asperiores. Dolores, possimus totam voluptate atque reprehenderit veniam dolorem inventore ea!</p>
       <Link to="/register">Login/Register</Link>
      </div>;
};

export default Landing;
