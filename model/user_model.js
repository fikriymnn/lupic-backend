const mongoose = require('mongoose')


const user_public_schema = new mongoose.Schema({
    nama:{
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    no_wa: {
        type:String,
        required:true
    },
    instansi: {
        type:String,
        required:true
    }, 
    tgl_lahir: {
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
    }
},
{timestamps:true}
)

module.exports =  mongoose.model("User_public",user_public_schema)