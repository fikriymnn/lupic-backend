require("dotenv").config();

const express = require('express')
const body_parser = require('body-parser')
const cookie_parser = require('cookie-parser')
const cors = require('cors')
const mongoose = require('mongoose')
const app = express()
app.use(cors({credentials: true, origin: true }))
const URL = process.env.DATABASE_URL
const PORT = process.env.PORT || 5000
const path = require('path')

async function start(){
    try{
        mongoose.connect(URL)
    }catch(err){
        console.log(err.message)
    }
    
    const corsOptions = {
        exposedHeaders: 'Content-Disposition',credentials: true, origin: true 
      }
    app.use(cors(corsOptions))
    app.use(body_parser.json())
    app.use(body_parser.urlencoded({extended:true}))
    app.use(cookie_parser())
    
    app.use("/api",require('./router/router'))

    app.use("/file",express.static(path.join(__dirname, 'file')));
    
    
    try{
        app.listen(PORT,()=>{
            console.log(`Server running on port ${PORT}`)
        })
    }catch(err){
        console.log(err.message)
    }
    
}

start()
module.exports = app
