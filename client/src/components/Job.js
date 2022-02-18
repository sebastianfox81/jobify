import moment from 'moment'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context/appContext'
// import JobInfo from './JobInfo'

const Job = ({
  _id,
  position,
  company,
  jobLocation,
  jobType,
  createdAt,
  status,
}) => {
  const { setEditJob, deleteJob,  } = useGlobalContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <div >
      <header>
        <div className='main-icon'><h2>{company.charAt(0)}</h2></div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <h5>{jobLocation}</h5>
          <h5>{date}</h5>
          <h5>{jobType}</h5>
          <div className={`status ${status}`}>{status}</div>
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-job'
              className='btn edit-btn'
              onClick={() => setEditJob(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteJob(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Job