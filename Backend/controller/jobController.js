
import path from "path";
import jobModel from "../model/jobModel.js";
import { applicationModel } from "../model/applicationModel.js";

export const postJob  = async(req,res)=>{
   try {
    const {
        title,
        description,
        requirements,
        salary,
        location,
        jobType,
        position,
        companyId,
        experienceLevel,
    } = req.body;

    const userId = req.id;
 
    if (!title || !description || !Array.isArray(requirements) || requirements.length === 0 || !salary || !location  || !companyId) {
        return res.status(400).json({ message: "All required fields must be provided." });
    }
    
    
    console.log("job post",req.body)
    const requirmentsArray = typeof requirements === "string" ? requirements.split(",") : requirements;

    const postJob=  new jobModel({
        title,
        description,
        requirments: requirmentsArray,
        salary:Number(salary),
        experiencelevel:Number(experienceLevel), 
        location,
        jobType,
        position,
        company:companyId,
        created_by: userId,
    })
    const newjob = await postJob.save()
    if (!newjob) {
        return res.status().json({
            message:"Job not Found",
            sucess:false
        })
    }
   return res.status(201).json({ message: "Job created successfully", job: newjob });
   } catch (error) {
      res.status(400).json({
        message: "Network error",
        sucess: false,
      });
    console.log("eror in job post",error)
   }
}

// get posted jobs
export const getPostedJobs = async (req, resp) => {
    const userId = req.id;
    try {
        const jobs = await jobModel.find({ created_by: userId }).populate({
            path:"company"
        });

        if (jobs.length === 0) { 
            return resp.status(404).json({
                message: "No jobs found",
                success: false
            });
        }

        return resp.status(200).json({
            jobs,
            success: true
        });
    } catch (error) {
        console.log("Error in getPostedJobs:", error);
        resp.status(500).json({
            message: "Internal Server Error",
            success: false
        });
    }
};

// user can search or browse all jobs by keywords like fronetend developer
export const getAllJobs = async (req,res)=>{
 try {
    const keyword = req.query.keyword || "" ;
const formattedKeyword = keyword.split(" ").join("|"); 

const query = {
    $or: [
        { title: { $regex: new RegExp(`\\b(${formattedKeyword})\\b`, "i") } }, // Exact word match
        { description: { $regex: new RegExp(`\\b(${formattedKeyword})\\b`, "i") } },
        {jobType: { $regex: new RegExp(`\\b(${formattedKeyword})\\b`, "i") } },
        { requirments: { $regex: new RegExp(`\\b(${formattedKeyword})\\b`, "i") } },
        { location: { $regex: new RegExp(`\\b(${formattedKeyword})\\b`, "i") } },
        { salary: { $regex: new RegExp(`\\b(${formattedKeyword})\\b`, "i") } },



    ]
};

const jobs = await jobModel.find(query).populate({
    path: "company"
});

    if (!jobs) {
        return res.status().json({
            message:"Job not Found",
            sucess:false
        })
    }
    return res.status(200).json({ jobs , sucess:true});
 } catch (error) {
    res.status(400).json({
        message: "Network error",
        sucess: false,
      });
    console.log("eror in search all job",error)
 }
}

// user specific job ko browse kr skat h
export const getjobbyId = async(req,res)=>{
    try {
        const jobId = req.params.id;
       const job =  await jobModel.findById(jobId).populate({
        path:"applications"
       })
       if (!job) {
        return res.status().json({
            message:"Job not Found",
            sucess:false
        })
    }
    return res.status(200).json({job , sucess:true });
    } catch (error) {
        res.status(400).json({
            message: "Network error",
            sucess: false,
          });
       console.log("error in getjobbyId",error) 
    }

}

//  user ne job post ke hoge vo excess kr ske ga

export const getUserJobs = async (req,res)=>{
    try {
        const userId =  req.params.id;
        console.log("user id is", userId)
        const jobs = await jobModel.find({created_by:userId}).populate({
            path:"company"
        })
        if (!jobs) {
            return res.status().json({
                message:"Jobs not Found",
                sucess:false
            })
        }
        return res.status(200).json({jobs , sucess:true });

    } catch (error) {
        res.status(400).json({
            message: "Network error",
            sucess: false,
          });
       console.log("error in getUserJobs",error) 
    
    }
}

// GET /api/admin/total-jobs
export const getTotalJobs = async (req, res) => {
    try {
      const totalJobs = await jobModel.countDocuments();
      res.status(200).json({ totalJobs });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch job count" });
    }
  };
  
// GET /api/admin/latest
export const getLatestData = async (req, res) => {
    try {
      const latestJobs = await jobModel.find().sort({ createdAt: -1 }).limit(5);
      const latestApplicants = await applicationModel
        .find()
        .sort({ createdAt: -1 })
        .limit(5)
        .populate("applicant");
  
      res.status(200).json({ latestJobs, latestApplicants });
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch latest data" });
    }
  };
  