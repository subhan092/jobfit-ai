import mongoose from "mongoose";

const dbConnect = async()=>{
   try {
   await mongoose.connect(process.env.MONGO_KEY)
   console.log('Databse connection sucessfully')
   } catch (error) {
    console.error(`DB Error${error}`)
   }
}
export default dbConnect