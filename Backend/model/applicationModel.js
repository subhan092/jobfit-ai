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
        enum:['pending','rejected','selected'],
        default:'pending'
     }
},{timestamp:true})

export const applicationModel = mongoose.model('Application',appSchema)

