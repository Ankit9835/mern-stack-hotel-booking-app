import axios from 'axios'

export const createHotel = async (token,data) => {
    await axios.post(`${process.env.REACT_APP_API}/create-hotel`,data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
}

export const getAllHotel = async () => {
  await axios.get(`${process.env.REACT_APP_API}/hotels`)
}

export const diffDays =  (from,to) => {
  const day = 24 * 60 * 60 * 1000;
  const start = new Date(from);
  const end = new Date(to);
  const difference = Math.round(Math.abs((start - end) / day));
  console.log('diff in days',difference)
  return difference;
}

export const sellerHotels = async (token) => {
  await axios.get(`${process.env.REACT_APP_API}/seller/hotel`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })
}

export const isAlreadyBooked = async (token,hotelId) => 
  await axios.get(`${process.env.REACT_APP_API}/is-already-booked/${hotelId}`,{
    headers:{
      Authorization: `Bearer ${token}`
    }
  })

  export const searchHotel = async (data) => 
     await axios.post(`${process.env.REACT_APP_API}/search/hotel`, data)
