import express from "express"

const router = express.Router()
import {showMessage} from '../controllers/showMessage.js'

router.get('/user' , showMessage)

export default router