import express from "express"

const router = express.Router()
import {showMessage,register} from '../controllers/showMessage.js'

router.get('/user' , showMessage)
router.post('/register', register)

export default router