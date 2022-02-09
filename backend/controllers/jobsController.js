const jobsCtrl = {};

jobsCtrl.createJob =  async (req, res) => {
  res.send('create new job')
}
jobsCtrl.getAllJobs = async (req, res) => {
  res.send('fetch jobs')
}
jobsCtrl.updateJob = async (req, res) => {
  res.send('update job')
}
jobsCtrl.deleteJob = async (req, res) => {
  res.send('deleteJob')
}
jobsCtrl.showStats = async (req, res) => {
  res.send('show stats')
}

module.exports = jobsCtrl