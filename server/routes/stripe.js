import express from "express"
import { connect } from "mongoose"
import { requireSignin } from "../middleware/index.js"

const router = express.Router()
import {connectWithStripe, getStripeDetails} from '../controllers/stripe.js'

router.post('/connect-with-stripe', requireSignin, connectWithStripe)
router.post('/get-account-status', requireSignin, getStripeDetails)

export default router