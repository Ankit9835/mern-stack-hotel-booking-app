import express from "express"


const router = express.Router()
import {showMessage,register,login} from '../controllers/showMessage.js'

router.get('/user' , showMessage)
router.post('/register', register)
router.post('/login', login)

export default router