import User from "../models/userModel.js"
import jwt from 'jsonwebtoken'


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

export const login = async (req,res) => {
    const {email,password} = req.body
    if(!email || !password){
        return res.status(400).json({
            success:false,
            message:'please provide all values'
        })
    }
    const user = await User.findOne({email})
    if(!user){
        return res.status(400).json({
            success:false,
            message:'Email not found'
        })
    }
    const isPasswordCorrect = await user.comparePassword(password)
    if(!isPasswordCorrect){
        return res.status(400).json({
            success:false,
            message:'Password is incorrect'
        })
    }
    user.password = undefined
   const token = jwt.sign({_id:user._id}, process.env.JWT_SECRET,{
    expiresIn:'1d'
   })
   return res.status(200).json({
    success:true,
    message:'Login Successfully',
    token,
    user
   })
}