const mongoose = require('mongoose')


const home_schema = new mongoose.Schema({
    hero_section: {
       type:String,
       required: true
    },
    carousel: {
        type:Array,
        default:[]
    },
},
{timestamps:true}
)

module.exports =  mongoose.model("Home",home_schema)