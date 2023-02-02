import Stripe from "stripe"
import User from "../models/userModel.js";
const stripe = Stripe(process.env.STRIPE_SECRET);
import queryString from "query-string";


export const connectWithStripe = async (req,res) => {
    const user = await User.findById(req.user._id).exec();
    if(!user.stripe_account_id){
        const account = await stripe.accounts.create({
            type: "standard",
          });
        user.stripe_account_id = account.id
        await user.save()
    }
    // 3. create login link based on account id (for frontend to complete onboarding)
    let accountLink = await stripe.accountLinks.create({
            account: user.stripe_account_id,
            refresh_url: process.env.STRIPE_REDIRECT_URL,
            return_url: process.env.STRIPE_REDIRECT_URL,
            type: "account_onboarding",
    });
        // prefill any info such as email
    accountLink = Object.assign(accountLink, {
            "stripe_user[email]": user.email || undefined,
    });
     console.log("ACCOUNT LINK", accountLink);
    let link = `${accountLink.url}?${queryString.stringify(accountLink)}`;
    console.log("LOGIN LINK", link);
    res.send(link);
    // 4. update payment schedule (optional. default is 2 days
}

export const getStripeDetails = async (req,res) => {
    try {
        const user = await User.findById(req.user._id).select("-password")
        //console.log(user)
        const account = await stripe.accounts.retrieve(user.stripe_account_id)
        //console.log('Getting stripe account information', account)
        const updatedUser = await User.findByIdAndUpdate(user._id,
        {
            stripe_seller: account
        },{
            new:true
        })
        console.log('updated user', updatedUser)
        res.send(updatedUser)
    } catch (error) {
        console.log(error)
    }
}