import React from 'react'
import { useSelector,useDispatch } from "react-redux";

const Home = () => {
    const {user} = useSelector((state) => state.auth)
    const dispatch = useDispatch()
  return (
    <div>
      Home, {JSON.stringify(user)}
    </div>
  )
}

export default Home
