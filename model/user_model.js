const mongoose = require('mongoose')


const user_schema = new mongoose.Schema({
    email: {
        type:String,
        required:true
    },
    password: {
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"admin"
    }
},
{timestamps:true}
)

module.exports =  mongoose.model("User",user_schema)