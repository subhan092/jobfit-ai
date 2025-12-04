import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { deleteUserById, forgotPassword, getAllUsers, getPendingRecruiters, getResumeScore, getTotalUsers, getUserById, loadUser, login, logout, registor, updateProfile, updateRecruiterStatus, verifyUser } from '../controller/userController.js'; 
import { uploadSingle } from '../middlewares/multer.js';
// import { getLatestData } from '../controller/jobController.js';

const router = express.Router();

router.route('/registor').post(uploadSingle,registor);
router.route('/login').post(login);
router.route('/profile/update').post(userAuth, uploadSingle,updateProfile); 
router.route('/logout').get(logout);
router.route('/get/user').get(userAuth,loadUser);
router.route('/total-users').get(userAuth,getTotalUsers)
router.route('/get-all-users').get(userAuth,getAllUsers)
router.get('/user/:id', getUserById);
router.get('/user/delete/:id', deleteUserById);
router.post("/verify-email",verifyUser)
router.post('/match-resume',userAuth,getResumeScore)
router.post('/forgot-password', forgotPassword)
router.put("/update-recruiter-status", userAuth, updateRecruiterStatus);
router.get("/get-pending-recruiters", userAuth, getPendingRecruiters);






export default router;
