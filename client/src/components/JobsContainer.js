import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/appContext';
import Job from './Job'

const JobsContianer = () => {
  const { getAllJobs, jobs, isLoading, page, totalJobs } = useGlobalContext();

  useEffect(() => {
    getAllJobs()
  },[])

    if (isLoading) {

      return (
        <div>
          <h3>...Loading</h3>
        </div>
      )
    }

  if (jobs.length === 0) {
    return (
      <h3>
        No jobs to display
      </h3>
    )
  }

  return (
    <div>
    <h5>{totalJobs} Job{jobs.length > 1 && 's'} Found</h5>
    <div className='jobs'>
      {jobs.map((job) => {
        return (
          <Job key={job._id} {...job}/>
        )
      })}
    </div>

    </div>
  )

}

export default JobsContianer