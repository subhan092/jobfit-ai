import express, { json, urlencoded } from "express"
import env from "dotenv"
import cors from "cors"
import cookieParser  from "cookie-parser"
import dbConnect from "./utils/db.js"
import userRoute from "./routes/userRoutes.js"
import Companyrouter from "./routes/companyRoutes.js"
import jobRouter from "./routes/jobRoutes.js"
import  applicationRouter from "./routes/applicationRoutes.js"
const app = express()
env.config()

const corsOptions ={
    origin :"http://localhost:5173",
    credentials : true
}
// Middleware 
app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())
app.use(urlencoded({extended:true}))

// routes

app.use('/',userRoute)
app.use('/company',Companyrouter)
app.use('/job',jobRouter)
app.use('/application',applicationRouter)

const Port = process.env.PORT || 3000
app.listen(Port,()=>{
    dbConnect()
    console.log(`application runing at port ${Port}`)
})