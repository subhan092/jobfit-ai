import userModel from "../model/userModel.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken';
import cloudinary from "../utils/cloudnary.js";
import { getDataUri } from "../utils/data-Uri.js";

const hasPass =async (password)=>{
    const pass= await bcrypt.hash(password,10)
    return pass
}



export const registor = async(req,resp)=>{
    try {
        console.log("Backend pe aaya data:", req.body);
        console.log("user photo",req.file)
        const {name,email,password, phoneNumber ,role} = req.body;

        const file = req.file 
        const fileUri = getDataUri(file) 
       const uploadResponse = await cloudinary.uploader.upload(fileUri);
      

    if(!name || !email || !password || !role){
        return resp.status(400).json({
            message:"something went wrong",
            sucess:false
        })
    }

    const user =await userModel.findOne({email})

    if(user){
        return resp.status(400).json({
            message:"user already exists",
            sucess:false
        })
    }

    await userModel.create({
        name,
        email,
        phoneNumber,
        password: await hasPass(password),
        role,
        photo:uploadResponse.secure_url
    })
    return resp.status(200).json({
        message:"Account created sucessfully",
        sucess:true
    })
    } catch (error) {
        console.log("eror in user registor",error)
      return  resp.status(500).json({
            message:"network error",
            sucess:false
        })
        
    }


}

export const login = async (req, resp) => {
    try {
        const { email, password , role } = req.body;

        const User = await userModel.findOne({ email });
        
        if (!User) {
            return resp.status(400).json({
                message: "Email not found",
                success: false
            });
        }

        const passCheck = await bcrypt.compare(password, User.password);
        if (!passCheck) {
            return resp.status(400).json({
                message: "Please enter correct password",
                success: false
            });
        }
        if (!role) {
            return resp.status(400).json({
                message: "Please select your role",
                success: false
            });
        }
        if (User.role != role) {
            return resp.status(400).json({
                message: "Invalid Role",
                success: false
            });
        }
        
        const tokenData = { userId: User._id };
        const token = jwt.sign(tokenData, process.env.SECRET_KEY, { expiresIn: '1d' });

        const userData = {
            id: User._id,
            name: User.name,
            phoneNumber: User.phoneNumber,
            email: User.email,
            profile: User.profile,
            photo:User.photo,
            role: User.role
        };

        return resp.status(200)
            .cookie("token", token, {
                maxAge: 24 * 60 * 60 * 1000,  // 1 day
                httpOnly: true,  
                sameSite: 'strict'
            })
            .json({
                message: `Welcome back ${User.name}`,
                userData,
                success: true,
            });

    } catch (error) {
        console.log("Error in user login:", error);
        resp.status(500).json({
            message: "Network error",
            success: false
        });
    }
};


export const logout = async (req,resp)=>{
    try {
       return resp.status(200).cookie("token",null,{maxAge:0}).json({
            message:"log out sucessfully",
            sucess:true
        })
    } catch (error) {
        console.log("eror in user logout",error)
       return resp.status(500).json({
            message:"network error",
            sucess:false
        })
    }
}

export const loadUser = async (req,resp)=>{
    const userid = req.id
    try {
        const user = await userModel.findById(userid)
        if (!user) {
           return  resp.status(400).json({
                message:"please login first to access your acccount",
                sucess:false
            })
        }
        return  resp.status(200).json({
            user,
            sucess:false
        })
    } catch (error) {
        console.log("eror in user loadUser",error)
        resp.status(500).json({
            message:"network error",
            sucess:false
        })
    }
}
export const updateProfile = async (req, resp) => {
    try {
      console.log("Request Body:", req.body);
      console.log("Uploaded File:", req.file);
  
      const { name, email, phone, bio, skills } = req.body;

      // Resume file handle karna
      const file =  req.file ; 
      console.log(file,"resume")
       const fileUri = getDataUri(req.file)
    
    const uploadResponse = await cloudinary.uploader.upload(fileUri, {
        resource_type: "raw",
        access_mode: "public", 
        format: "pdf",  // Explicitly set file format
    });
    
    let fileUrl = uploadResponse.secure_url;
    
    // PDF ya non-image files ke liye URL correct karna
    if (uploadResponse.resource_type !== "image") {
        fileUrl = fileUrl.replace("/image/", "/raw/");
    }
      
      
  
      const userId = req.id; // Middleware se aayega
      const user = await userModel.findById(userId);
      console.log("User found in DB:", user);
  
      if (!user) {
        return resp.status(400).json({
          message: "User not found",
          success: false,
        });
      }
  
      // User update
      user.name = name;
      user.email = email;
      user.phoneNumber = phone;
      user.profile.bio = bio;
      user.profile.skills = JSON.parse(skills); // Skills string me hai, isko array me convert karo
      if (uploadResponse) {
        user.profile.resume = fileUrl;
        user.profile.resumeOriginalName = file.originalname
      }
     console.log("uploadedd resume is",file)
      await user.save();
  
      const userData = {
        id: user._id,
        name: user.name,
        phoneNumber: user.phoneNumber,
        email: user.email,
        profile: {
            bio: user.profile?.bio,
            skills: user.profile?.skills,
            resume: user.profile?.resume,
            resumeOriginalName: user.profile?.OriginalName, // Check if it's included
            company: user.profile?.company,
        },
        role: user.role,
        photo: user.photo
    };
    
    console.log("user data",userData)
  
      return resp.status(200).json({
        message: "Profile updated successfully",
        userData,
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
  
  export const getAllUsers = async (req,resp)=>{
    
    try {
        const candidates = await userModel.find({role:"user"})
        const recruiters = await userModel.find({role:"recruiter"})
        if (!candidates) {
           return  resp.status(400).json({
                message:"no candidates found",
                sucess:false
            })
        }
        if (!recruiters) {
            return  resp.status(400).json({
                 message:"no recruiters found",
                 sucess:false
             })
         }
        return  resp.status(200).json({
            recruiters,
            candidates,
            sucess:false
        })
    } catch (error) {
        console.log("eror in user loadUser",error)
        resp.status(500).json({
            message:"network error",
            sucess:false
        })
    }
}


export const getUserById = async (req, res) => {
    try {
      const user = await userModel.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found", success: false });
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
      res.status(500).json({ message: `Error in deleting user: ${error.message}` });
    }
  };
  