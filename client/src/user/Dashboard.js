import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Booking from '../components/Booking'
import ConnectNav from '../components/ConnectNav'
import DashboardNav from '../components/DashboardNav'


const Dashboard = () => {
  const [book,setBook] = useState([])
  const {user} = useSelector((state) => state.auth)
  const [showModal,setShowModal] = useState(false)
  const getBooking = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API}/user/hotels`,{
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      })
      console.log('booking',response)
      setBook(response.data)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getBooking()
  },[])
  return (
    <>
      <div className="container-fluid bg-secondary p-5">
        <ConnectNav />
      </div>

      <div className="container-fluid p-4">
        <DashboardNav />
      </div>

      <div className="container-fluid">
        <div className="row">
          <div className="col-md-10">
            <h2>Your Bookings</h2>
          </div>
          <div className="col-md-2">
            <Link to="/" className="btn btn-primary">
              Browse Hotels
            </Link>
          </div>
        </div>
      </div>

      <div className="row">
       {book.map((b)=>{
        return <Booking key={b._id} {...b} showModal={showModal} setShowModal={setShowModal}/>
       })}
      </div>
    </>
  )
}

export default Dashboard
