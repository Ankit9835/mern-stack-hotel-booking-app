import express from "express"


const router = express.Router()
import {getUserHotel} from '../controllers/user.js'
import { requireSignin, userAuthenticate } from "../middleware/index.js"


router.get('/user/hotels' ,  requireSignin, getUserHotel)




export default router