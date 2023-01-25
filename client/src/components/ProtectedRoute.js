import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, useNavigate } from 'react-router-dom'




const ProtectedRoute = ({children}) => {
  const {user} = useSelector((store) => store.auth)
  console.log('test',user)

  if(!user){
    return <Navigate to='/login' />
  } 
    return children
  
}

export default ProtectedRoute
