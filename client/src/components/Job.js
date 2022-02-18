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
  statusType,
}) => {
  const { setEditJob, deleteJob } = useGlobalContext()

  let date = moment(createdAt)
  date = date.format('MMM Do, YYYY')
  return (
    <div>
      <header>
        <div className='main-icon'>{company.charAt(0)}</div>
        <div className='info'>
          <h5>{position}</h5>
          <p>{company}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          {jobLocation}
          {date}
          {jobType}
          <div className={`status ${statusType}`}>{statusType}</div>
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