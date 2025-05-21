import mongoose from "mongoose";

const companySchema  = mongoose.Schema({
     name:{
            type: String,
            required:true,
     },
     description:{
        type: String,
    },
    location:{
        type: String,
     },
     website:{
        type: String,
     },
     logo:{
        type: String,
     },
     email:{
      type:String
     },
     phone:{
      type:String
     },
     socialLinks:{
      linkedin:{
         type:String
        },
        instagram:{
         type:String
        },
     },
     foundedYear:{
      type:String
     },
     userId:{ // kon company create kr rha h 
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User'
     }
},
{timestamps:true})

const CompanyModel =  mongoose.model('Company',companySchema)

export default CompanyModel