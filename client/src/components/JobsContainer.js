import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/appContext';
import Job from './Job'
import PageBtnContainer from './PageBtnContainer'

const JobsContianer = () => {
  const { getAllJobs, jobs, isLoading, page, totalJobs, search, searchStatus, searchType, sort, numOfPages } = useGlobalContext();

  useEffect(() => {
    getAllJobs()
  },[page, search, searchStatus, searchType, sort])

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
    <div className='container'>
    <h5>{totalJobs} Job{jobs.length > 1 && 's'} Found</h5>
    <div className='jobs'>
      {jobs.map((job) => {
        return (
          <Job key={job._id} {...job}/>
        )
      })}
    </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  )

}

export default JobsContianer