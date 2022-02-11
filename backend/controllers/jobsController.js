const createJob =  async (req, res) => {
  res.send('create new job')
}
const getAllJobs = async (req, res) => {
  res.send('fetch jobs')
}
const updateJob = async (req, res) => {
  res.send('update job')
}
const deleteJob = async (req, res) => {
  res.send('deleteJob')
}
const showStats = async (req, res) => {
  res.send('show stats')
}

export { createJob, getAllJobs, updateJob, deleteJob, showStats }