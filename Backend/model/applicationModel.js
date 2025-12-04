import mongoose from "mongoose";

const appSchema = mongoose.Schema({
     job:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Job'
     },
     applicant:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
     },
     status:{
        type:String,
        enum:['pending','shortlisted','interview','selected', 'rejected'],
        default:'pending'
     }
},{timestamp:true})

export const applicationModel = mongoose.model('Application',appSchema)

