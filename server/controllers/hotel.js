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