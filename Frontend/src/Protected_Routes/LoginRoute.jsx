import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'
import { looadUser } from '../redux/AsynThunk/User_Auth'

const LoginRoute = ({children}) => {
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(looadUser())
    }, [])
    
    const { user } = useSelector((state) => state.auth);

    if (user) {
      if (user.role === 'recruiter') {
        return <Navigate to="/recruiter/dashboard" />;
      }
      return <Navigate to="/" />;
    }
  
    return children;
 
}

export default LoginRoute