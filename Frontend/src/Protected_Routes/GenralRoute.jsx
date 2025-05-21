import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const GenralRoute = ({children}) => {

    const {user } =  useSelector((state)=>state.auth)
    const navigate = useNavigate()
       if (user){

        return children
           
       }
       else{
        navigate("/login")
       }
}

export default GenralRoute