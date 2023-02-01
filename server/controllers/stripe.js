import Stripe from "stripe"
import User from "../models/userModel.js";
const stripe = Stripe(process.env.STRIPE_SECRET);


export const connectWithStripe = async (req,res) => {
    const user = await User.findById(req.user._id).exec();
    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: "standard",
          });
        user.stripe_account_id = account.id
        await user.save()
    }
}