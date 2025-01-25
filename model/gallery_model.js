const mongoose = require('mongoose')


const gallery_schema = new mongoose.Schema({
    deskripsi: {
        type:String,
    },
    gambar: {
        type:String,
        required:true
    },
},
{timestamps:true}
)

module.exports =  mongoose.model("Gallery",gallery_schema)
