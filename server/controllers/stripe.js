import Stripe from "stripe"
import User from "../models/userModel.js";
const stripe = Stripe(process.env.STRIPE_SECRET);
import queryString from "query-string";
import Hotel from "../models/hotel.js";
import Order from "../models/order.js"

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
       // const updatedAccount = await updateDelayDays(account.id)
       // console.log('updated account', updatedAccount)
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
// const updateDelayDays = async (accountId) => {
//     const account = await stripe.accounts.update(accountId, {
//       settings: {
//         payouts: {
//           schedule: {
//             delay_days: 7,
//           },
//         },
//       },
//     });
//     return account;
//   };

export const getAccountBalance = async (req,res) => {
    const user = await User.findById(req.user._id).select("-password")
    try{
        const balance = await stripe.balance.retrieve({
            stripeAccount: user.stripe_account_id
        })
        console.log('balance',balance)
        res.json(balance)
    } catch(error){
        
    }
}

export const payoutSetting = async (req,res) => {
    try{
        const user = await User.findById(req.user._id).select("-password")
       
        const response = await stripe.accounts.createLoginLink(user.stripe_seller.id,{
            redirect_url:process.env.STRIPE_SETTING_REDIRECT_URL
        })
        console.log('payout response', response)
    } catch(error){
        console.log(error)
    }
}

export const getStripeSessionData = async  (req,res) => {
  try {
     // console.log("you hit stripe session id", req.body.hotelId);
  // 1 get hotel id from req.body
  const { hotelId } = req.body;
  // 2 find the hotel based on hotel id from db
  const item = await Hotel.findById(hotelId).populate("postedBy").exec();
  // 3 20% charge as application fee
  console.log('hotel item', item.price)
  const fee = (item.price * 20) / 100;
  console.log('fee',fee)
  //4 create a session
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ["card"],
    // 5 purchasing item details, it will be shown to user on checkout
    line_items: [
      {
        name: item.title,
        amount: item.price * 100, // in cents
        currency: "inr",
        quantity: 1,
      },
    ],
    // 6 create payment intent with application fee and destination charge 80%
    payment_intent_data: {
      application_fee_amount: fee * 100,
      // this seller can see his balance in our frontend dashboard
      transfer_data: {
        destination: item.postedBy.stripe_account_id,
      },
    },
    // success and calcel urls
    success_url: `${process.env.STRIPE_SUCCESS_URL}/${item._id}`,
    cancel_url: process.env.STRIPE_CANCEL_URL,
  });

//   const session = await stripe.checkout.sessions.create({
//     mode: 'payment',
//     line_items: [{price: item.price, quantity: 1}],
//     payment_intent_data: {
//       application_fee_amount: fee,
//       transfer_data: {destination: item.postedBy.stripe_account_id},
//     },
//     success_url: process.env.STRIPE_SUCCESS_URL,
//     cancel_url: process.env.STRIPE_CANCEL_URL,
//   });

  // 7 add this session object to user in the db
  await User.findByIdAndUpdate(req.user._id, { stripeSession: session }).exec();
  // 8 send session id as resposne to frontend
  res.send({
    sessionId: session.id,
  });
  } catch (error) {
    console.log(error.message)
  }
  
}

export const stripeSuccessData = async (req,res) => {
  try {
    const {hotelId} = req.body
    console.log('hotel id',hotelId)
    const user = await User.findById(req.user._id)
    console.log('user stripe session',Object.keys(user.stripeSession).length)
    if(Object.keys(user.stripeSession).length === 0 && user.stripeSession.constructor === Object){
      return res.json({success:true,
        message:'No new session found'
      })
    }
    const session = await stripe.checkout.sessions.retrieve(user.stripeSession.id)
    if(session.payment_status == 'paid'){
      const orderExist = await Order.findOne({"session.id":session.id})
      if(orderExist){
        res.json({success:true,
          message:'Order already there'
        })
      } else {
        let newOrder = await Order.create({
          hotel:hotelId,
          session,
          orderedBy:user._id
        })
        await User.findByIdAndUpdate(user._id,{
          $set: {stripeSession: {}}
        })
        res.json({ success: true });
      }
    }
  } catch (error) {
    console.log(error.message)
  }
}