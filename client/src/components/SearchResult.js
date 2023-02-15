import React, { useEffect, useState } from 'react'
import queryString from 'query-string';
import { searchHotel } from '../actions/hotel';
import axios from 'axios';
import SmallCard from './SmallCard'

const SearchResult = () => {
 const [searchLocation,setSearchLocation] = useState('')
 const [searchBed,setSearchBed] = useState('')
 const [searchDate,setSearchDate] = useState('')
 const [hotels,setHotels] = useState([])

 const searchHotel = async () => {
  const {location,bed,date} = queryString.parse(window.location.search)
  const response = await axios.post(`${process.env.REACT_APP_API}/search/hotel`, {location,bed,date})
  if(response){
    setHotels(response.data)
  }
 }

 const removeHotel = async (hotelId) => {
 
    
}

 useEffect(()=>{
  searchHotel()
 },[window.location.search])

  return (
    <div className='container'>
      <div className='row'>
        {hotels.map((hotel) => {
          return <SmallCard key={hotel._id} {...hotel} removeHotel={removeHotel} />
        })}
      </div>
    </div>
  )
}

export default SearchResult
