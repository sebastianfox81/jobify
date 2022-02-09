import React, { useEffect } from 'react';

const Dashboard = () => {

  const fetchData = async () => {
    try {
      const res = await fetch('/api/v1')
      const data = await res.json();
      console.log(data)
    } catch (err) {
      console.log(err)
    }

  }
  useEffect(() => {
    fetchData()
  }, [])

  return <div>
    <h1>Dashboard</h1>
  </div>;
};

export default Dashboard;
