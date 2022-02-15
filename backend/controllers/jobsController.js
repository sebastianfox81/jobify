import Job from '../models/Job.js';
import  statusCodes  from 'http-status-codes'
import { BadRequest, UnAuthenticatedError, NotFound } from '../errors/index.js'

const createJob =  async (req, res) => {

  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequest('Please provide all values')
  }
  req.body.createdBy = req.user.userId;
  const job = await Job.create(req.body)

  res.status(statusCodes.default.CREATED).json({ job })
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