import express from 'express';
const router = express.Router();

import { createJob, getAllJobs, updateJob, deleteJob, showStats} from '../controllers/jobsController.js'

router.route('/:user').post(createJob)
router.route('/:user').get(getAllJobs)
router.route('/stats').get(showStats)
router.route('/:id').delete(deleteJob).patch(updateJob);

export default router