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
  const { statusType, jobType, search, sort } = req.query

  const queryObject = {
    createdBy: req.params.user
  }
  // ADD STUFF BASED ON CONDITIONS
  if (statusType && statusType !== 'all') {
    queryObject.statusType = statusType
  }
  if (jobType && jobType !== 'all') {
    queryObject.jobType = jobType
  }
  if (search) {
    queryObject.position = { $regex: search, $options: 'i' }
  }
  // NO AWAIT
  let result = Job.find(queryObject)

  // CHAIN SORT CONDITIONS
  if (sort === 'latest') {
    result = result.sort('-createdAt')
  }
  if (sort === 'oldest') {
    result = result.sort('-reatedAt')
  }
  if (sort === 'a-z') {
    result = result.sort('position')
  }
  if (sort === 'z-a') {
    result = result.sort('-position')
  }

  // Pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;

  const skip = (page - 1) * limit

  result = result.skip(skip).limit(limit)

  const jobs = await result

  const totalJobs = await Job.countDocuments(queryObject)
  const numOfPages = Math.ceil(totalJobs/limit)

 res.status(statusCodes.default.OK).json({ jobs, totalJobs, numOfPages})

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