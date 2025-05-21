import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { applyJob, getApplicants, getAppliedJob, getTotalApplications, updateStatus } from '../controller/applicationController.js';

const router = express.Router();

router.route('/apply/:id').post(userAuth, applyJob);
router.route('/get').get(userAuth, getAppliedJob);
router.route('/get-applicants/:id').get(userAuth, getApplicants); 
router.route('/update/:id').put(userAuth, updateStatus);
router.route('/total-applications').get(userAuth,getTotalApplications)

export default router;
