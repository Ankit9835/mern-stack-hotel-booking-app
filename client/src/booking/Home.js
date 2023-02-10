import React, { useEffect, useState } from 'react'
import {diffDays, getAllHotel}  from '../actions/hotel';
import axios from 'axios';
import SmallCard from '../components/SmallCard';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const Home = () => {
    const [hotels,setHotels] = useState([])
    const {user} = useSelector((state) => state.auth)
    const getHotels = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/hotels`)
        console.log('hotel response',res)
        setHotels(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    const removeHotel = async (hotelId) => {
      try {
        const response = await axios.delete(`${process.env.REACT_APP_API}/remove-hotel/${hotelId}`,{
          headers:{
            Authorization: `Bearer ${user.token}`
          }
        })
        if(response){
          toast.success('hotel removed successfully')
          getHotels()
        } else {
          toast.error('something went wrong')
        }
      } catch (error) {
          console.log(error)
          toast.error(error.message)
      }
    }
  

    useEffect(() => {
      getHotels()
    },[])

  return (
    <>
       <div className="container-fluid bg-secondary p-5 text-center">
        <h1>All Hotels</h1>
      </div>
      <div className="container-fluid">
       
       {hotels.map((hotel) => (
          <SmallCard key={hotel._id} {...hotel} removeHotel={removeHotel} />
        ))}
      </div>
    </>
  )
}

export default Home
