import CompanyModel from "../model/companyModel.js";
import userModel from "../model/userModel.js";
import cloudinary from "../utils/cloudnary.js";
import { getDataUri } from "../utils/data-Uri.js";


export const companyRegistor = async (req, resp) => {
  try {
    const { name, description, location, website } = req.body;

    console.log("RE WBODY:", req.body);


    if (!name) {
      return resp.status(400).json({
        message: "Please enter company name first",
        success: false,
      });
    }

    const companyExists = await CompanyModel.findOne({ name });
    if (companyExists) {
      return resp.status(400).json({
        message: "Company already exists",
        success: false,
      });
    }

    const fileUri = getDataUri(req.file) 
    console.log(req.file)
   const uploadResponse = await cloudinary.uploader.upload(fileUri);

    const company = await CompanyModel.create({
      name,
      description,
      location,
      logo: uploadResponse.secure_url,  
      website,
      userId: req.id,
    });

    const user = await userModel.findById(req.id);
 
    
    if (user.profile.company) {
      return resp.status(400).json({ message: "You already registered a company." });
    }
    
    user.profile.company = company._id;
    await user.save();
    
    return resp.status(201).json({
      message: "Company created successfully",
      company,
      success: true,
    });
  } catch (error) {
    console.error("Error in company registration:", error);
    resp.status(500).json({
      message: "Network error",
      success: false,  
    });
  }
};


export const getCompany = async (req, resp) => {
  try {
    // sare companes get kro jo k specfic user ne create ke h
    // { userId: req.id }
    const companes = await CompanyModel.find();

    if (!companes) {
      return resp.status(400).json({
        message: "Companies not found",
        sucess: false,
      });
    }
    return resp.status(200).json({
      companes,
      sucess: true,
    });
  } catch (error) {
    resp.status(400).json({
      message: "Network error",
      sucess: false,
    });
    console.log("error in get company ", error);
  }
};
export const getCompanybyId = async(req,resp)=>{
    try {
        const companyId = req.params.id
       const company = await CompanyModel.findById(companyId)
       if (!company) {
        return resp.status(400).json({
            message: "Company not found",
            sucess: false,
          });
       }
       return resp.status(200).json({
        company,
        sucess: false,
      });
    } catch (error) {
        resp.status(400).json({
            message: "Network error",
            sucess: false,
          });
          console.log("error in get companybyid ", error); 
    }
}

export const updateCompany = async (req, res) => {
  try {
    const companyId = req.params.id;
    console.log("com p id", companyId)
    const {
      name,
      description,
      location,
      website,
      email,
      phone,
      foundedYear,
      employeeCount,
    } = req.body;

    // console.log("req comp",req.body)
    if( !name ||
      !description ||
      !location ||
      !website ||
      !email ||
      !phone ||
      !foundedYear ||
      !employeeCount ||
      !req?.file){
        return     res.status(500).json({ success: false, message: "all input field must be provided"});

      }
    // Parse socialLinks if received as JSON string
    const socialLinks = req.body.socialLinks
      ? JSON.parse(req.body.socialLinks)
      : {};

    const updatedData = {
      name,
      description,
      location,
      website,
      email,
      phone,
      foundedYear,
      employeeCount,
      socialLinks,
    };

    // console.log("com logo",req?.file)
     const file = req.file 
            const fileUri = getDataUri(file) 
           const uploadResponse = await cloudinary.uploader.upload(fileUri);
    if (file) {
      updatedData.logo = uploadResponse.secure_url; // Or full path if needed
    }

    const updatedCompany = await CompanyModel.findByIdAndUpdate(
      companyId,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Company updated successfully",
      company: updatedCompany,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update company", error: error.message });
    console.log("error in company update",error)
  }
};
