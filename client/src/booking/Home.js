import React from 'react'
import { useSelector,useDispatch } from "react-redux";

const Home = () => {
    const {auth} = useSelector((state) => state)
    const dispatch = useDispatch()
  return (
    <div>
      Home, {JSON.stringify(auth)}
      
    </div>
  )
}

export default Home
