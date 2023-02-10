import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { sellerHotels } from '../actions/hotel'
import axios from 'axios'
import SmallCard from './SmallCard'
import { toast } from 'react-toastify'


const StripeConnected = () => {
  const {user} = useSelector((state) => state.auth)
  const [seller,setSeller] = useState([])

  const getData = async () => {
    try {
      const res =  await axios.get(`${process.env.REACT_APP_API}/seller/hotel`,{
        headers:{
          Authorization: `Bearer ${user.token}`
        }
      })
      setSeller(res.data)
      console.log('seller hotels',res)
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
        getData()
      } else {
        toast.error('something went wrong')
      }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }
  }

  useEffect(() => {
    getData()
  },[])
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-10">
          <h2>Your Hotels</h2>
          
          {seller.map((hotel) => (
          <SmallCard key={hotel._id} {...hotel} owner={true} showMoreViewButton = {false} removeHotel={removeHotel} />
        ))}
        </div>
        <div className="col-md-2">
          <Link to="/hotels/new" className="btn btn-primary">
            + Add New
          </Link>
        </div>
      </div>
    </div>
  )
}

export default StripeConnected
