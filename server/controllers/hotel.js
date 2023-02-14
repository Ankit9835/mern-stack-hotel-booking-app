import fs from "fs";
import Hotel from '../models/hotel.js'
import Order from '../models/order.js'

export const createHotel = async (req,res) => {
    console.log('fields', req.fields)
    console.log('file', req.files)
    try{
        let fields = req.fields
        let files = req.files
        let hotel = new Hotel(fields)

        if(files.image){
            hotel.image.data = fs.readFileSync(files.image.path);
            hotel.image.contentType = files.image.type;
        }
        hotel.postedBy = req.user._id
        const result = await hotel.save()
        if(res){
            res.json(result)
        } else {
            res.json('error')
        }
    } catch(error){
        console.log(error);
        res.status(400).json({
        err: error.message,
        });
        
    }
}

export const getHotel = async (req,res) => {
    try {
        const hotel = await Hotel.find({}).select('-image.data').populate('postedBy', '_id name')
        res.status(200).json(hotel) 
    } catch (error) {
        console.log(error)
        res.json(400).json({
            err:error.message
        })
    }
    
}

export const image = async (req,res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId)
       // console.log('outside')
        if(hotel && hotel.image.contentType && hotel.image.data !== null){
            res.set('Content-Type', hotel.image.contentType)
           return res.send(hotel.image.data)
         //console.log('test')
        }
    } catch (error) {
        console.log(error)
    }
}

export const sellerHotel = async (req,res) => {
    try {
        const hotel = await Hotel.find({postedBy:req.user._id}).select('-image.data').populate('postedBy','_id name')
        console.log(hotel)
        res.json(hotel)
    } catch (error) {
        console.log(error)
    }
}

export const removeHotel = async (req,res) => {
    try {
        const hotel = await Hotel.findByIdAndDelete(req.params.hotelId)
        //console.log('delete hotel',hotel)
        res.status(200).json(hotel)
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}

export const viewHotel = async (req,res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId)
        if(hotel){
            res.status(200).json(hotel)
        }
    } catch (error) {
        console.log(error.message)
        res.status(403).json(error.message)
    }
}

export const editHotel = async (req,res) => {
    try {
        const hotel = await Hotel.findById(req.params.hotelId).populate('postedBy').select('-image.data')
        res.status(200).json(hotel)
    } catch (error) {
        console.log(error.message)
        res.json(error.message)
    }
}

export const updateHotel = async (req,res) => {
    try {
        let fields = req.fields;
        console.log('fields',fields)
        let files = req.files;
        console.log('files',files)
        let data = { ...fields };

        if (files.image) {
        let image = {};
        image.data = fs.readFileSync(files.image.path);
        image.contentType = files.image.type;

        data.image = image;
        }
        console.log('params',req.params.hotelId)
        console.log('data',data)
        let updated = await Hotel.findByIdAndUpdate(req.params.hotelId, data, {
            new: true,
          }).select("-image.data");
        res.json(updated)
    } catch (error) {
        console.log(error.message);
         res.status(400).send(error.message);
    }
}

export const isAlreadyBooked = async (req,res) => {
    try {
        const {hotelId} = req.params
        const order = await Order.find({orderedBy:req.user._id,hotel:hotelId}).select('hotel')
        console.log('order',order)
        if(order.length > 0){
            // let Ids = []
            // for(let i = 0; i < order.length; i++){
            //     Ids.push(order[i].hotel.toString())
            // }
            // return res.json({
            //     ok:Ids.includes(hotelId)
            // })
            return res.json({
                ok:true
            })
        } else {
            return res.json({
                ok:false
            })
        }
    } catch (error) {
        console.log(error.message)
    }
}

