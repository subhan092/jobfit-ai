import express from 'express';
import { getAllJobs, getjobbyId, getLatestData, getPostedJobs, getTotalJobs, getUserJobs, postJob } from '../controller/jobController.js';
import userAuth from '../middlewares/userAuth.js';

const router = express.Router();

router.route('/post').post(userAuth, postJob);
router.route('/get/all').get(getAllJobs);
router.route('/get/recruiter/:id').get(userAuth, getUserJobs); 
router.route('/get/:id').get(getjobbyId);
router.route('/get').get(userAuth,getPostedJobs);
router.route('/total-jobs').get(userAuth,getTotalJobs)
router.route('/latest-data').get(userAuth,getLatestData)


export default router;
