import Order from '../models/order.js'

export const getUserHotel = async (req,res) => {
    try {
        const hotel = await Order.find({orderedBy:req.user._id}).select('session')
        .populate('hotel','-image.data')
        .populate('orderedBy', '_id name')
        console.log(hotel)
        res.status(200).json(hotel)
    } catch (error) {
        console.log(error)
    }
}