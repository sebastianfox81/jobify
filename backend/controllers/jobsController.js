import Job from '../models/Job.js';
import User from '../models/User.js';
import  statusCodes  from 'http-status-codes'
import { BadRequest, UnAuthenticatedError, NotFound } from '../errors/index.js'
import mongoose from 'mongoose'

const createJob =  async (req, res) => {


  const { position, company } = req.body;
  if (!position || !company) {
    throw new BadRequest('Please provide all values')
  }
  req.body.createdBy = req.params.user
  const job = await Job.create(req.body)

  res.status(statusCodes.default.CREATED).json({ job })
  // res.json(user)
}

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.params.user})
  res.status(statusCodes.default.OK).json({
    jobs,
    totalJobs: jobs.length,
    numOfPages: 1
  })

}
const updateJob = async (req, res) => {
  const { id } = req.params
  const { company, position } = req.body;

  if (!position || !company) {
    throw new BadRequest('Please provide all values')
  }
  const job = await Job.findOne({ _id: id })
  if (!job) {
    throw new NotFound(`No job with id : ${id}`)
  }
  const updatedJob = await Job.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true
  })
  res.status(statusCodes.default.OK).json({ updatedJob })
}
const deleteJob = async (req, res) => {
  const { id } = req.params;
  const job = await Job.findOne({ _id: id })
  if (!job) {
    throw new NotFound(`No job with id : ${id}`)
  }
  await job.remove();
  res.status(statusCodes.default.OK).json({job})
}

const showStats = async (req, res) => {
  res.send('show stats')
}

export { createJob, getAllJobs, updateJob, deleteJob, showStats }