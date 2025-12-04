import userModel from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import cloudinary from "../utils/cloudnary.js";
import { getDataUri } from "../utils/data-Uri.js";
import { joi_Schema } from "../Joi/Validationschema.js";
import { sendVerifiactiponEmail } from "../email/sendEmail.js";
import axios from "axios";


const hasPass = async (password) => {
  const pass = await bcrypt.hash(password, 10);
  return pass;
};

export const registor = async (req, resp) => {
  try {
    console.log("Backend pe aaya data:", req.body);
    console.log("user photo", req.file);
   

    const { name, email, password, phoneNumber, role } = req.body;

    if (req.file) {
      const file = req.file;
      const fileUri = getDataUri(file);
      var  uploadResponse = await cloudinary.uploader.upload(fileUri);
    }
//          -------------------- validation ----------------------------------------
    const { error } = joi_Schema.validate(req.body);

    if (error) {
      return resp.status(400).json({ message: error.details[0].message });
    }

    if (!name || !email || !password || !role) {
      return resp.status(400).json({
        message: "something went wrong",
        sucess: false,
      });
    }

    const user = await userModel.findOne({ email });

    if (user) {
      return resp.status(400).json({
        message: "user already exists",
        sucess: false,
      });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000);

    const created_User = await userModel.create({
      name,
      email,
      phoneNumber,
      password:await hasPass(password),
      role,
      verificationCode,
      isVerified: false,
      photo: uploadResponse?.secure_url ,
    });
    
    // -------------------------- Send verification email
    const emailResponse = await sendVerifiactiponEmail(email, verificationCode);
    
    if (emailResponse) {
      return resp.status(201).json({
        success: true,
        message: "Verification code sent to your email",
        user: {
          _id: created_User._id,
          email: created_User.email,
          name: created_User.name,
          role: created_User.role,
        },
      });
    }
  } 
   catch (error) {
    console.log("eror in user registor", error);
    return resp.status(500).json({
      message: "network error",
      sucess: false,
    });
  }
};

export const login = async (req, resp) => {
  try {
    const { email, password, role } = req.body;
    // const { error } = joi_Schema.validate(req.body);
    // if (error) {
    //   return resp.status(400).json({ message: error.details[0].message });
    // }

    const User = await userModel.findOne({ email });

    if (!User) {
      return resp.status(400).json({
        message: "Email not found",
        success: false,
      });
    }

    const passCheck = await bcrypt.compare(password, User.password);
    if (!passCheck) {
      return resp.status(400).json({
        message: "Please enter correct password",
        success: false,
      });
    }
    if (!role) {
      return resp.status(400).json({
        message: "Please select your role",
        success: false,
      });
    }
    if (User.role != role) {
      return resp.status(400).json({
        message: "Invalid Role",
        success: false,
      });
    }

    const tokenData = { userId: User._id };


    const userData = {
      id: User._id,
      name: User.name,
      phoneNumber: User.phoneNumber,
      email: User.email,
      profile: User.profile,
      photo: User.photo,
      role: User.role,
    };

    if(User.isVerified){

      const token = jwt.sign(tokenData, process.env.SECRET_KEY, {
        expiresIn: "1d",
      });
      return resp
      .status(200)
      .cookie("token", token, {
        maxAge: 24 * 60 * 60 * 1000, // 1 day
        httpOnly: true,
        sameSite: "strict",
      })
      .json({
        message: `Welcome back ${User.name}`,
        userData,
        success: true,
      });
    }
    return resp.status(400).json({
      message: "User not verified",
      success: false,
    });
  
  } catch (error) {
    console.log("Error in user login:", error);
    resp.status(500).json({
      message: "Network error",
      success: false,
    });
  }
};

export const logout = async (req, resp) => {
  try {
    return resp.status(200).cookie("token", null, { maxAge: 0 }).json({
      message: "log out sucessfully",
      sucess: true,
    });
  } catch (error) {
    console.log("eror in user logout", error);
    return resp.status(500).json({
      message: "network error",
      sucess: false,
    });
  }
};

export const loadUser = async (req, resp) => {
  const userid = req.id;
  try {
    const user = await userModel.findById(userid);

    if (!user) {
      return resp.status(400).json({
        message: "please login first to access your acccount",
        sucess: false,
      });
    }
    return resp.status(200).json({
      user,
      sucess: false,
    });
  } catch (error) {
    console.log("eror in user loadUser", error);
    resp.status(500).json({
      message: "network error",
      sucess: false,
    });
  }
};


 export const updateProfile = async (req, resp) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);
  
      const { name, email, phone, bio, skills } = req.body;
      const file = req.file;
      const fileUri = getDataUri(req.file);
  
      const uploadResponse = await cloudinary.uploader.upload(fileUri, {
        resource_type: "raw",
        access_mode: "public",
        format: "pdf",
      });
  
      let fileUrl = uploadResponse.secure_url;
      if (uploadResponse.resource_type !== "image") {
        fileUrl = fileUrl.replace("/image/", "/raw/");
      }
  
      const userId = req.id;
      const user = await userModel.findById(userId);
      if (!user) {
        return resp.status(400).json({
          message: "User not found",
          success: false,
        });
      }
  
      // Update user data
      user.name = name;
      user.email = email;
      user.phoneNumber = phone;
      user.profile.bio = bio;
      user.profile.skills = JSON.parse(skills);
  
      if (uploadResponse) {
        user.profile.resume = fileUrl;
        user.profile.resumeOriginalName = file.originalname;
        console.log("Resume URL:", fileUrl);
  
        console.log("Calling Python API to extract resume text");
        
        // Call Python Flask API instead of spawning a process
        const result = await axios.post('http://127.0.0.1:8000/resume/resume/upload', { user_id: userId, file_url: fileUrl }, { timeout: 10000 });

  
        // const result = await response;
        console.log("extersactt resume text is",result.data.text)

        console.log("resume embeddings",result.data.embeddings)
        
        if (!result) {
          console.error("Python API error:", result.error);
          throw new Error("Failed to extract text from resume");
        }
  
        // Save extracted resume text
        user.profile.resumeText = result.data.text;
        user.profile.resumeEmbeddings = result.data.embeddings
      }
  
      await user.save();
  
      return resp.status(200).json({
        message: "Profile updated successfully",
        userData: {
          id: user._id,
          name: user.name,
          phoneNumber: user.phoneNumber,
          email: user.email,
          profile: {
            bio: user.profile?.bio,
            skills: user.profile?.skills,
            resume: user.profile?.resume,
            resumeOriginalName: user.profile?.resumeOriginalName,
            company: user.profile?.company,
            resumeText: user.profile?.resumeText,
            resumeEmbeddings : user?.profile.resumeEmbeddings
          },
          role: user.role,
          photo: user.photo,
        },
        success: true,
      });
    } catch (error) {
      console.log("Error in updating user profile:", error);
      resp.status(500).json({
        message: "Network error",
        success: false,
      });
    }
  };


// GET /api/admin/total-users
export const getTotalUsers = async (req, res) => {
  try {
    const total = await userModel.countDocuments();
    const recruiters = await userModel.countDocuments({ role: "recruiter" });
    const candidates = await userModel.countDocuments({ role: "user" });

    res.status(200).json({
      total,
      recruiters,
      candidates,
    });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch user stats" });
  }
};

export const getAllUsers = async (req, resp) => {
  try {
    const candidates = await userModel.find({ role: "user" });
    const recruiters = await userModel.find({ role: "recruiter" });
    if (!candidates) {
      return resp.status(400).json({
        message: "no candidates found",
        sucess: false,
      });
    }
    if (!recruiters) {
      return resp.status(400).json({
        message: "no recruiters found",
        sucess: false,
      });
    }
    return resp.status(200).json({
      recruiters,
      candidates,
      sucess: false,
    });
  } catch (error) {
    console.log("eror in user loadUser", error);
    resp.status(500).json({
      message: "network error",
      sucess: false,
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found", success: false });
    }
    res.status(200).json({ user, success: true });
  } catch (err) {
    res.status(500).json({ message: "Server error", success: false });
  }
};

export const deleteUserById = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await userModel.findByIdAndDelete(userId);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: `Error in deleting user: ${error.message}` });
  }
};

export const verifyUser = async (req, res) => {
  const { email, code } = req.body;
  console.log(req.body)

  try {
    const user = await userModel.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.verificationCode === code) {
      user.isVerified = true;
      user.verificationCode = null; // clear the code after verification
      await user.save();
      return res.status(200).json({ message: "Email verified successfully" ,
        success :true
      });
    } else {
      return res.status(400).json({ message: "Invalid verification code" ,
        success:false
       });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};




export const getResumeScore =  async (req, res) => {
  try {
    const { jobDescription } = req.body;
    const userId = req?.id ;
    // 1. Fetch user's resume from MongoDB
    const user = await userModel.findById(userId);
    // console.log("user is",user)
    if (!user?.profile?.resumeText) {
      return res.status(400).json({ error: "Resume not found" });
    }
    // console.log("job descrip",jobDescription.trim())
    console.log('||||||||||||||||||||||||||||||||||||||||||')
    // console.log("resume text", user?.profile?.resumeText )
    // 2. Call Python ML API
    const response = await axios.get('http://127.0.0.1:8000/job/job/check_score', {
      params: {
        user_id: userId,
        job_description: jobDescription,
      },
    });    
    console.log('||||||||||||||||||||||||||||||||||||||||||')


    console.log("resume score response",response)

    // 3. Send similarity score back to frontend
    res.json({ score: response.data.score });
  } catch (error) {
    console.error("Error in resume score:", error);
    res.status(500).json({ error: "Failed to calculate score" });
  }
}




export const forgotPassword = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log("forgot password email and new pass",email,password)
    const user = await userModel.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ message: "User not found", success: false });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    user.password = hashedPassword;
    await user.save({ validateBeforeSave: false });

    res.status(200).json({ message: "Password updated successfully", success: true });
  } catch (error) {
    res.status(500).json({ message: `Error in updating password: ${error.message}` });
    console.log("error in forgot password",error)

  }
}

export const updateRecruiterStatus = async (req, res) => {
  try {
    const { status , userId} = req.body;
    console.log("upd status calling.....", req.body)

    const user = await userModel.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
        success: false,
      });
    }



    user.RecruiterStatus = status;

    await user.save({ validateBeforeSave: false });

    return res.status(200).json({
      message: "Recruiter status updated successfully",
      success: true,
      user,
    });

  } catch (error) {
    console.log("error in update recruiter status", error);
    return res.status(500).json({
      error: "Server error",
      success: false,
    });
  }
};

// GET all recruiters with pending status (latest first)
export const getPendingRecruiters = async (req, res) => {
  try {
    const users = await userModel
      .find({
        role: "recruiter",
        RecruiterStatus: "pending"
      })
      .sort({ createdAt: -1 });
        // latest first

       
    res.status(200).json({
      success: true,
      count: users.length,
      users,
    });

  } catch (error) {
    console.log("error in getPendingRecruiters", error);
    res.status(500).json({ error: "Server error" });
  }
};

