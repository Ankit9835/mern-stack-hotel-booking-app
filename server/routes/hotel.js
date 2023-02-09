import express from "express"
import formidable from 'express-formidable'

const router = express.Router()
import {createHotel, getHotel,image,sellerHotel} from '../controllers/hotel.js'
import { requireSignin } from "../middleware/index.js"

router.post('/create-hotel' ,  requireSignin , formidable(), createHotel)
router.get('/hotels' ,  getHotel)
router.get('/hotel/image/:hotelId' ,  image)
router.get('/seller/hotel' , requireSignin, sellerHotel)


export default router