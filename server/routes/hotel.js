import express from "express"
import formidable from 'express-formidable'

const router = express.Router()
import {createHotel, getHotel,image,sellerHotel,removeHotel, viewHotel, editHotel, updateHotel,isAlreadyBooked,searchHotel} from '../controllers/hotel.js'
import { requireSignin, userAuthenticate } from "../middleware/index.js"


router.post('/create-hotel' ,  requireSignin , formidable(), createHotel)
router.get('/hotels' ,  getHotel)
router.get('/hotel/image/:hotelId' ,  image)
router.get('/seller/hotel' , requireSignin, sellerHotel)
router.delete('/remove-hotel/:hotelId' , requireSignin, userAuthenticate, removeHotel)
router.get('/view/single/hotel/:hotelId' ,  viewHotel)
router.get('/hotel/edit/:hotelId' ,   editHotel)
router.put('/update/hotel/:hotelId' , requireSignin, userAuthenticate, formidable(), updateHotel)
router.get('/is-already-booked/:hotelId' , requireSignin,  isAlreadyBooked)
router.post('/search/hotel' ,  searchHotel)



export default router