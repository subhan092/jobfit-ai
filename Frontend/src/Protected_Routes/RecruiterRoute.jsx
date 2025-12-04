import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const RecruiterRoute = ({children}) => {
    const {user } =  useSelector((state)=>state.auth)
    const navigate = useNavigate()
       if (user){
           if (user.role == 'recruiter') {
            if (user.RecruiterStatus == "pending" || user.RecruiterStatus == "rejected") {
                return navigate("/pending-approval")
            }
            else{
                return children

            }
           }
           else if(user.role == 'admin'){
           return navigate('/admin/dashboard')
           }
           else{
            return  navigate('/')
           }
       }
       else{
       return navigate("/login")
       }
}

export default RecruiterRoute