import express from "express"
import { connect } from "mongoose"
import { requireSignin } from "../middleware/index.js"

const router = express.Router()
import {connectWithStripe} from '../controllers/stripe.js'

router.post('/connect-with-stripe', requireSignin, connectWithStripe)

export default router