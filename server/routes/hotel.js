import express from "express"
import formidable from 'express-formidable'

const router = express.Router()
import {createHotel} from '../controllers/hotel.js'
import { requireSignin } from "../middleware/index.js"

router.post('/create-hotel' ,  requireSignin , formidable(), createHotel)


export default router