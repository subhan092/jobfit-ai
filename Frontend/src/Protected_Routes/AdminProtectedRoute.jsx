import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'

const AdminProtectedRoute = ({children}) => {

    const {user } =  useSelector((state)=>state.auth)
    const navigate = useNavigate()
       if (user){
           if (user.role == 'admin') {
            return children
           }
           else if(user.role == 'recruiter'){
            navigate('/recruiter/dashboard')
           }
           navigate("/")
       }
       else{
        navigate("/login")
       }
}

export default AdminProtectedRoute