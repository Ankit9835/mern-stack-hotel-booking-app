import fs from "fs";
import Hotel from '../models/hotel.js'

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