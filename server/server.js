import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import router from './routes/auth.js'
import stripe from './routes/stripe.js'
import hotel from './routes/hotel.js'
import morgan from 'morgan'
import cors from "cors";
import {readdirSync} from 'fs'
import connectDB from './config/dbConfig.js'

const app = express()
app.use(express.json())
app.use(cors())
app.use(morgan("dev"))
app.use('/api', router)
app.use('/api', stripe)
app.use('/api', hotel)
const port =  process.env.port

const start = async () => {
    try{
        await connectDB(process.env.MONGO_URL)
        app.listen(port, () => {
            console.log(`server is listening to ${port} no`)
        })
    } catch (err) {
        console.log(err)
    }
    
}

start()