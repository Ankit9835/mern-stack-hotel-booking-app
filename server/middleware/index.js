import dotenv from 'dotenv'
dotenv.config()
import expressJWT from "express-jwt";
import Hotel from '../models/hotel.js'

export const requireSignin = expressJWT({
  secret: process.env.JWT_SECRET,
  algorithms: ["HS256"],
});

export const userAuthenticate = async (req,res,next) => {
  try {
    const hotel = await Hotel.findById(req.params.hotelId).select('-image.data')
   // console.log('middleware',hotel)
    if(hotel){
      const owner = hotel.postedBy._id.toString() === req.user._id.toString()
      if(!owner){
        res.status(403).json({
          err:'Unauthorized'
        })
      }
      next() 
    }
  } catch (error) {
    
  }
}

