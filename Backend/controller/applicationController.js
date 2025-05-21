import { applicationModel } from "../model/applicationModel.js";
import jobModel from "../model/jobModel.js";


export const applyJob = async (req, res) => {
    try {
        const userId = req.id;
        const jobId = req.params.id;
        console.log("job id in param",jobId)
        // Validate jobId
        if (!jobId) {
            return res.status(400).json({
                message: "Job ID is required",
                success: false
            });
        }

        // Check if the user has already applied
        const existingApplication = await applicationModel.findOne({ applicant: userId, job: jobId });
        if (existingApplication) {
            return res.status(400).json({
                message: "You have already applied for this job",
                success: false
            });
        }

        // Check if the job exists
        const jobFound = await jobModel.findById(jobId);
        if (!jobFound) {
            return res.status(404).json({
                message: "Job not found",
                success: false
            });
        }

        // Create a new application
        const newApplication = await applicationModel.create({
            applicant: userId,
            job: jobId,
        });
    

        if (!newApplication) {
            return res.status(500).json({
                message: "Something went wrong",
                success: false
            });
        }

        // Add the application ID to the job's applications array
        jobFound.applications.push(newApplication._id);
        await jobFound.save();

        return res.status(201).json({
            message: "You successfully applied for this job",
            success: true
        });

    } catch (error) {
        console.error("Error in applyJob:", error);
        res.status(500).json({
            message: "Network error",
            success: false
        });
    }
};

// user check how many job sthey are applied for.......
export const getAppliedJob = async (req,res)=>{
   try {
    const userId = req.id

    const applications = await applicationModel.find({applicant:userId}).populate({
        path:'job',
        options: {sort:{createdAt:-1}},
        populate:{
          path: 'company',
          options: {sort:{createdAt:-1}},
        }
    })

    if (!applications) {
        return res.status(400).json({
            message:"your application not found",
            sucess:false
        })
    }
    return res.status(200).json({
        applications,
        sucess:true
    })
   } 
   catch (error) {
    res.status(400).json({
        message:"Network error",
        sucess:false
    })
    console.log("eror in get applied Job",error)
 }
    
   }
  // recriter check the applications of specific job...
  export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;

        // Find job and populate applicants
        const job = await jobModel.findById(jobId).populate({
            path: 'applications',
            options: { sort: { createdAt: -1 } },
            populate: { path: 'applicant' }
        });

        // If job not found
        if (!job) {
            return res.status(400).json({
                message: "Job not found",
                success: false
            });
        }

        // If no applicants found
        if (!job.applications || job.applications.length === 0) {
            return res.status(400).json({
                message: "No applicants found for this job",
                success: false
            });
        }

        return res.status(200).json({
            applicants: job.applications,
            success: true
        });

    } catch (error) {
        console.error("Error in getApplicants:", error);
        res.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};


   export const updateStatus = async(req,res)=>{
     try {
        const status = req.body.status;
        const applicantionId = req.params.id;
        const application = await applicationModel.findById(applicantionId)
        if (!application) {
         return res.status(400).json({
             message:"Applicants not found",
             sucess:false
         })
        }
        application.status = status;
        await application.save()
        
        return res.status(200).json({
         message:"status updated sucessfully",
         application,
         sucess:true
     })
     } catch (error) {
        res.status(400).json({
            message:"Network error",
            sucess:false
        })
        console.log("eror in updateStatus",error)
     }

   }

   // GET /api/admin/total-applications
export const getTotalApplications = async (req, res) => {
    try {
      const totalApplications = await applicationModel.countDocuments();

      res.status(200).json({ totalApplications });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch application count" });
    }
  };
  