import express from 'express'
import dotenv from 'dotenv'
dotenv.config()
import router from './routes/auth.js'
import morgan from 'morgan'
import {readdirSync} from 'fs'

const app = express()
app.use(express.json())

app.use(morgan)
app.use('/api', router)

const port =  process.env.port

app.listen(port, () => {
    console.log(`server listening to port ${port} no`)
})