import express from "express"
import { connect } from "mongoose"
import { requireSignin } from "../middleware/index.js"

const router = express.Router()
import {connectWithStripe, getStripeDetails, getAccountBalance, payoutSetting, getStripeSessionData} from '../controllers/stripe.js'


router.post('/connect-with-stripe', requireSignin, connectWithStripe)
router.post('/get-account-status', requireSignin, getStripeDetails)
router.post('/get-account-balance', requireSignin, getAccountBalance)
router.post('/payout-setting', requireSignin, payoutSetting)
router.post('/session-id' ,  requireSignin , getStripeSessionData)

export default router