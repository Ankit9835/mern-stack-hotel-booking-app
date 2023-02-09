import React, { useEffect, useState } from 'react'
import {diffDays, getAllHotel}  from '../actions/hotel';
import axios from 'axios';
import SmallCard from '../components/SmallCard';


const Home = () => {
    const [hotels,setHotels] = useState([])

    const getHotels = async () => {
      try {
        const res = await axios.get(`${process.env.REACT_APP_API}/hotels`)
        console.log('hotel response',res)
        setHotels(res.data)
      } catch (error) {
        console.log(error)
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
          <SmallCard key={hotel._id} {...hotel} />
        ))}
      </div>
    </>
  )
}

export default Home
