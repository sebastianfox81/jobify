import React, { useEffect } from 'react';

const Dashboard = () => {

useEffect(() => {
  fetchData()
}, [])

const fetchData = async () => {
  const res = await fetch('/api/V1')
  const data = await res.json();
  console.log(data)
}

  return <div>
    <h1>Dashboard</h1>
  </div>;
};

export default Dashboard;
