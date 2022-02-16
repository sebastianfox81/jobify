import { FormRow, Alert, FormRowSelect } from '../../components'
import { useGlobalContext } from '../../context/appContext'

const AddJob = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    position,
    company,
    jobLocation,
    jobType,
    jobTypeOptions,
    statusType,
    statusOptions,
    handleChange,
    clearValues,
    createJob,
    editJob,
    handleJobChange,
  } = useGlobalContext();

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!position || !company || !jobLocation) {
      displayAlert()
      return
    }
    // if (isEditing) {
    //   editJob()
    //   return
    // }
    createJob()
  }
  const handleJobInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleJobChange({ name, value })
  }

  return (
    <div>
      <form className='form'>
        <h3>{isEditing ? 'edit job' : 'add job'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
          {/* position */}
          <FormRow
            type='text'
            name='position'
            value={position}
            handleChange={handleJobInput}
          />
          {/* company */}
          <FormRow
            type='text'
            name='company'
            value={company}
            handleChange={handleJobInput}
          />
          {/* location */}
          <FormRow
            type='text'
            labelText='job location'
            name='jobLocation'
            value={jobLocation}
            handleChange={handleJobInput}
          />
          {/* job status */}
          <FormRowSelect
              name='statusType'
              value={statusType}
              handleChange={handleJobInput}
              list={statusOptions}
          />
          {/* job type */}
          <FormRowSelect
              name='jobType'
              value={jobType}
              labelText='Job type'
              handleChange={handleJobInput}
              list={jobTypeOptions}
          />
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default AddJob
