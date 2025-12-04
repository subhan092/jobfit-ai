import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UserRoute = ({children}) => {

    const {user } =  useSelector((state)=>state.auth)
    const navigate = useNavigate()
       if (user){
           if (user.role == 'user') {
            return children
           }
       }
       else{
        navigate("/login")
       }
}

export default UserRoute