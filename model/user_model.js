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
},
{timestamps:true}
)

module.exports =  mongoose.model("User_public",user_public_schema)