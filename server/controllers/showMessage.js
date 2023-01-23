import User from "../models/userModel.js"


export const showMessage = (req,res) => {
    res.send('welcome')
}

export const register = async (req,res) => {
    try{
        const {name,email,password} = req.body
        console.log(req.body)
        if(!name || !email || !password){
            res,status(400).json({
                status:false,
                message:'please provide all values'
            })
        }
        const isEmailExists = await User.findOne({email})
        if(isEmailExists){
            return res.status(400).json({
                status:false,
                message:'Email already exists'
            })
        }
        const user = await User.create({name,email,password})
            
            return res.status(200).json({
                status:true,
                message:'User created Successfully'
            })
       
    } catch(err){
        return res.status(400).json({
            status:false,
            message: err
        })
    }
    
}