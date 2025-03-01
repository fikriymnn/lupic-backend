const mongoose = require('mongoose')


const modul_schema = new mongoose.Schema({
    cover: {
       type:String,
    },
    judul: {
        type:String,
     },
     file: {
        type:String,
     }
},
{timestamps:true}
)

module.exports =  mongoose.model("Modul",modul_schema)