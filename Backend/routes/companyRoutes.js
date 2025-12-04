import express from 'express';
import userAuth from '../middlewares/userAuth.js';
import { companyRegistor, getCompany, getCompanybyId, updateCompany } from '../controller/companyController.js';
import { uploadSingle } from '../middlewares/multer.js';


const router = express.Router();

router.route('/registor').post(userAuth,uploadSingle,companyRegistor);
router.route('/get').get(userAuth,getCompany);
router.route('/:id').get(userAuth, getCompanybyId); 
router.route('/update/:id').put(userAuth,uploadSingle,updateCompany);

export default router;
